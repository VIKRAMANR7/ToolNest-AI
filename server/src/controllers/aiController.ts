import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import fs from "fs";
import { AI } from "../utils/ai.js";
import { requireUser } from "../utils/authHelpers.js";
import { checkUsage, bumpUsage } from "../utils/usage.js";
import { saveCreation } from "../utils/saveCreation.js";
import { uploadBase64Image, uploadFile, cleanup } from "../utils/files.js";

import axios from "axios";
import pdf from "pdf-parse/lib/pdf-parse.js";

const PREMIUM = "premium";
const MAX_RESUME_SIZE = 5 * 1024 * 1024;

export const generateArticle = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUser(req, res);
  if (!userId) return;

  const { prompt, length = 500 } = req.body;
  const { plan, free_usage } = req;

  if (!prompt || !prompt.trim()) {
    res.status(400).json({ success: false, message: "Prompt is required" });
    return;
  }

  const usage = checkUsage(plan, free_usage);
  if (!usage.allowed) {
    res.status(403).json({ success: false, message: usage.message });
    return;
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

  res.json({ success: true, content });
});

export const generateBlogTitle = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUser(req, res);
  if (!userId) return;

  const { prompt } = req.body;
  const { plan, free_usage } = req;

  if (!prompt || !prompt.trim()) {
    res.status(400).json({ success: false, message: "Prompt is required" });
    return;
  }

  const usage = checkUsage(plan, free_usage);
  if (!usage.allowed) {
    res.status(403).json({ success: false, message: usage.message });
    return;
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

  res.json({ success: true, content });
});

export const generateImage = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUser(req, res);
  if (!userId) return;

  if (req.plan !== PREMIUM) {
    res.status(403).json({ success: false, message: "Premium plan required" });
    return;
  }

  const { prompt, publish = false } = req.body;

  if (!prompt || !prompt.trim()) {
    res.status(400).json({ success: false, message: "Prompt is required" });
    return;
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

  res.json({ success: true, content: uploaded.secure_url });
});

export const removeImageBackground = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUser(req, res);
  if (!userId) return;

  if (req.plan !== PREMIUM) {
    res.status(403).json({ success: false, message: "Premium required" });
    return;
  }

  const image = req.file;
  if (!image) {
    res.status(400).json({ success: false, message: "Image required" });
    return;
  }

  const uploaded = await uploadFile(image.path, "toolnest-ai/background-removed");
  cleanup(image.path);

  await saveCreation({
    userId,
    prompt: "Background removal",
    content: uploaded.secure_url,
    type: "image",
  });

  res.json({ success: true, content: uploaded.secure_url });
});

export const removeImageObject = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUser(req, res);
  if (!userId) return;

  if (req.plan !== PREMIUM) {
    res.status(403).json({ success: false, message: "Premium required" });
    return;
  }

  const image = req.file;
  const { object } = req.body;

  if (!image) {
    res.status(400).json({ success: false, message: "Image required" });
    return;
  }

  if (!object || !object.trim()) {
    res.status(400).json({ success: false, message: "Object description required" });
    return;
  }

  const uploaded = await uploadFile(image.path, "toolnest-ai/object-removed");
  cleanup(image.path);

  const processedUrl = uploaded.secure_url;

  await saveCreation({
    userId,
    prompt: `Removed object: ${object}`,
    content: processedUrl,
    type: "image",
  });

  res.json({ success: true, content: processedUrl });
});

export const resumeReview = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUser(req, res);
  if (!userId) return;

  if (req.plan !== PREMIUM) {
    res.status(403).json({ success: false, message: "Premium required" });
    return;
  }

  const resume = req.file;
  if (!resume) {
    res.status(400).json({ success: false, message: "Resume required" });
    return;
  }

  if (resume.size > MAX_RESUME_SIZE) {
    cleanup(resume.path);
    res.status(400).json({ success: false, message: "File must be <5MB" });
    return;
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

  res.json({ success: true, content });
});
