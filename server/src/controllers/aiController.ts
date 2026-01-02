import type { Request, Response } from "express";
import fs from "fs";
import axios from "axios";
import pdf from "pdf-parse/lib/pdf-parse.js";

import { asyncHandler } from "../middleware/asyncHandler.js";
import { AI } from "../utils/ai.js";
import { requireUser } from "../utils/authHelpers.js";
import { checkUsage, bumpUsage } from "../utils/usage.js";
import { saveCreation } from "../utils/saveCreation.js";
import { uploadBase64Image, uploadFile, cleanup } from "../utils/files.js";

const PREMIUM = "premium";
const MAX_RESUME_SIZE = 5 * 1024 * 1024;

export const generateArticle = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUser(req, res);
  if (!userId) return;

  const { prompt, length = 500 } = req.body;
  const { plan, free_usage } = req;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ success: false, message: "Prompt is required" });
  }

  const usage = checkUsage(plan, free_usage);
  if (!usage.allowed) {
    return res.status(403).json({ success: false, message: usage.message });
  }

  const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [{ role: "user", content: prompt }],
    max_tokens: length,
    temperature: 0.7,
  });

  const content = response.choices?.[0]?.message?.content || "";

  await saveCreation({ userId, prompt, content, type: "article" });
  await bumpUsage(userId, plan, free_usage);

  return res.json({ success: true, content });
});

export const generateBlogTitle = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUser(req, res);
  if (!userId) return;

  const { prompt } = req.body;
  const { plan, free_usage } = req;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ success: false, message: "Prompt is required" });
  }

  const usage = checkUsage(plan, free_usage);
  if (!usage.allowed) {
    return res.status(403).json({ success: false, message: usage.message });
  }

  const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 100,
    temperature: 0.7,
  });

  const content = response.choices?.[0]?.message?.content || "";

  await saveCreation({ userId, prompt, content, type: "blog-title" });
  await bumpUsage(userId, plan, free_usage);

  return res.json({ success: true, content });
});

export const generateImage = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUser(req, res);
  if (!userId) return;

  if (req.plan !== PREMIUM) {
    return res.status(403).json({ success: false, message: "Premium plan required" });
  }

  const { prompt, publish = false } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ success: false, message: "Prompt is required" });
  }

  const form = new FormData();
  form.append("prompt", prompt);

  const { data } = await axios.post<ArrayBuffer>("https://clipdrop-api.co/text-to-image/v1", form, {
    responseType: "arraybuffer",
    headers: { "x-api-key": process.env.CLIPDROP_API_KEY || "" },
  });

  const base64 = `data:image/png;base64,${Buffer.from(data).toString("base64")}`;
  const uploaded = await uploadBase64Image(base64, "toolnest-ai/generated-images");

  await saveCreation({
    userId,
    prompt,
    content: uploaded.secure_url,
    type: "image",
    publish,
  });

  return res.json({ success: true, content: uploaded.secure_url });
});

export const removeImageBackground = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUser(req, res);
  if (!userId) return;

  if (req.plan !== PREMIUM) {
    return res.status(403).json({ success: false, message: "Premium required" });
  }

  const image = req.file;
  if (!image) {
    return res.status(400).json({ success: false, message: "Image required" });
  }

  const uploaded = await uploadFile(image.path, "toolnest-ai/background-removed");
  cleanup(image.path);

  await saveCreation({
    userId,
    prompt: "Background removal",
    content: uploaded.secure_url,
    type: "image",
  });

  return res.json({ success: true, content: uploaded.secure_url });
});

export const removeImageObject = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUser(req, res);
  if (!userId) return;

  if (req.plan !== PREMIUM) {
    return res.status(403).json({ success: false, message: "Premium required" });
  }

  const image = req.file;
  const { object } = req.body;

  if (!image) {
    return res.status(400).json({ success: false, message: "Image required" });
  }

  if (!object || !object.trim()) {
    return res.status(400).json({ success: false, message: "Object description required" });
  }

  const uploaded = await uploadFile(image.path, "toolnest-ai/object-removed");
  cleanup(image.path);

  await saveCreation({
    userId,
    prompt: `Removed object: ${object}`,
    content: uploaded.secure_url,
    type: "image",
  });

  return res.json({ success: true, content: uploaded.secure_url });
});

export const resumeReview = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUser(req, res);
  if (!userId) return;

  if (req.plan !== PREMIUM) {
    return res.status(403).json({ success: false, message: "Premium required" });
  }

  const resume = req.file;
  if (!resume) {
    return res.status(400).json({ success: false, message: "Resume required" });
  }

  if (resume.size > MAX_RESUME_SIZE) {
    cleanup(resume.path);
    return res.status(400).json({ success: false, message: "File must be <5MB" });
  }

  const buffer = fs.readFileSync(resume.path);
  const pdfData = await pdf(buffer);

  cleanup(resume.path);

  const prompt = `Review the following resume:\n\n${pdfData.text}`;

  const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 1000,
    temperature: 0.7,
  });

  const content = response.choices?.[0]?.message?.content || "";

  await saveCreation({
    userId,
    prompt: "Resume review",
    content,
    type: "resume-review",
  });

  return res.json({ success: true, content });
});
