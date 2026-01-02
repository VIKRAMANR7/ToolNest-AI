import { useAuth } from "@clerk/clerk-react";
import { Edit, Hash, Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

import api from "../utils/api";
import type { ContentResponse } from "../types/api";

const blogCategories = [
  "General",
  "Technology",
  "Business",
  "Health",
  "Lifestyle",
  "Education",
  "Travel",
  "Food",
];

export default function BlogTitles() {
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input.trim()) {
      toast.error("Please enter a keyword");
      return;
    }

    try {
      setLoading(true);

      const token = await getToken();
      const prompt = `Generate a blog title for the keyword "${input}" in the category "${selectedCategory}".`;

      const { data } = await api.post<ContentResponse>(
        "/api/ai/generate-blog-title",
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message || "Failed to generate title");
      }
    } catch {
      toast.error("Something went wrong while generating the blog title.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-wrap items-start gap-4 overflow-y-scroll p-6 text-slate-700">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-4"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#8e37eb]" />
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Keyword</p>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="e.g. Future of AI, Healthy lifestyle..."
          className="mt-2 w-full rounded-md border border-gray-300 p-2 px-3 text-sm outline-none"
          required
        />

        <p className="mt-4 text-sm font-medium">Category</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {blogCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSelectedCategory(item)}
              className={`cursor-pointer rounded-full border px-4 py-1 text-xs ${
                selectedCategory === item
                  ? "border-purple-300 bg-purple-50 text-purple-700"
                  : "border-gray-300 text-gray-500 hover:border-gray-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#c341f6] to-[#8e37eb] px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {loading ? (
            <span className="size-4 animate-spin rounded-full border-2 border-t-transparent" />
          ) : (
            <Hash className="size-5" />
          )}
          Generate Title
        </button>
      </form>

      <div className="flex min-h-96 w-full max-w-lg flex-col rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <Edit className="size-5 text-[#8e37eb]" />
          <h1 className="text-xl font-semibold">Generated Title</h1>
        </div>

        {!content ? (
          <div className="flex flex-1 items-center justify-center text-sm text-gray-400">
            <div className="flex flex-col items-center gap-4">
              <Hash className="size-9" />
              <p>Enter a keyword and click "Generate Title"</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}
