import { useAuth } from "@clerk/clerk-react";
import { Image as ImageIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import api from "../utils/api";
import type { ContentResponse } from "../types/api";
import { API_ENDPOINTS } from "../config/constants";

const imageStyles = [
  "Realistic",
  "Ghibli style",
  "Anime style",
  "Cartoon style",
  "Fantasy style",
  "3D style",
  "Portrait style",
];

export default function GenerateImages() {
  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please describe your image");
      return;
    }

    try {
      setLoading(true);

      const token = await getToken();
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}.`;

      const { data } = await api.post<ContentResponse>(
        API_ENDPOINTS.GENERATE_IMAGE,
        { prompt, publish },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message || "Failed to generate image");
      }
    } catch {
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-wrap items-start gap-4 overflow-y-scroll p-6 text-slate-700">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg border bg-white p-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-green-600" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Describe Your Image</p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="mt-2 w-full rounded-md border p-2 text-sm outline-none"
          placeholder="Describe what you want to see..."
          required
        />

        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {imageStyles.map((style) => (
            <button
              type="button"
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`cursor-pointer rounded-full border px-4 py-1 text-xs ${
                selectedStyle === style
                  ? "bg-green-50 text-green-700"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
              className="peer sr-only"
            />
            <div className="h-5 w-9 rounded-full bg-slate-300 transition peer-checked:bg-green-500" />
            <span className="absolute top-1 left-1 size-3 rounded-full bg-white transition peer-checked:translate-x-4" />
          </label>
          <p className="text-sm">Make this image public</p>
        </div>

        <button
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-green-600 to-green-400 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {loading ? (
            <span className="my-1 size-4 animate-spin rounded-full border-2 border-t-transparent" />
          ) : (
            <ImageIcon className="w-5" />
          )}
          Generate Image
        </button>
      </form>

      <div className="min-h-96 w-full max-w-lg rounded-lg border bg-white p-4">
        <div className="flex items-center gap-3">
          <ImageIcon className="size-5 text-green-600" />
          <h1 className="text-xl font-semibold">Generated Image</h1>
        </div>

        {!content ? (
          <div className="flex flex-1 items-center justify-center text-gray-400">
            <ImageIcon className="mb-3 size-9" />
            <p>Enter a description and click "Generate Image"</p>
          </div>
        ) : (
          <div className="mt-3">
            <img src={content} alt="AI generated" className="w-full rounded-lg object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}
