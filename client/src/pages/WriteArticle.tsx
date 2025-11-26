import { useAuth } from "@clerk/clerk-react";
import { Edit, Sparkles } from "lucide-react";
import { useState, FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

import api from "../utils/api";
import type { ContentResponse } from "../types/api";
import { articleLengthOptions, type ArticleLength } from "../assets/assets";

export default function WriteArticle() {
  const [selectedLength, setSelectedLength] = useState<ArticleLength>(articleLengthOptions[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    try {
      setLoading(true);

      const token = await getToken();
      const prompt = `Write an article about ${input} in ${selectedLength.text}.`;

      const { data } = await api.post<ContentResponse>(
        "/api/ai/generate-article",
        {
          prompt,
          length: selectedLength.length,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Article generated!");
      } else {
        toast.error(data.message || "Failed to generate article");
      }
    } catch {
      toast.error("Something went wrong while generating the article.");
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <div className="flex h-full flex-wrap items-start gap-4 overflow-y-scroll p-6 text-slate-700">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-4"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="size-6 text-[#4a7aff]" />
          <h1 className="text-xl font-semibold">Article Configuration</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Article Topic</p>
        <input
          value={input}
          onChange={handleInputChange}
          type="text"
          placeholder="The future of artificial intelligence..."
          className="mt-2 w-full rounded-md border border-gray-300 p-2 px-3 text-sm outline-none"
          required
        />

        <p className="mt-4 text-sm font-medium">Article Length</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {articleLengthOptions.map((option) => (
            <button
              key={option.text}
              type="button"
              onClick={() => setSelectedLength(option)}
              className={`cursor-pointer rounded-full border px-4 py-1 text-xs transition-colors ${
                selectedLength.text === option.text
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-500 hover:border-gray-400"
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#226bff] to-[#65adff] px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {loading ? (
            <span className="my-1 size-4 animate-spin rounded-full border-2 border-t-transparent" />
          ) : (
            <Edit className="size-5" />
          )}
          Generate Article
        </button>
      </form>

      <div className="flex max-h-[600px] min-h-96 w-full max-w-lg flex-col rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <Edit className="size-5 text-[#4a7aff]" />
          <h1 className="text-xl font-semibold">Generated Article</h1>
        </div>

        {!content ? (
          <div className="flex flex-1 items-center justify-center text-sm text-gray-400">
            <div className="flex flex-col items-center gap-5">
              <Edit className="size-9" />
              <p>Enter a topic and click “Generate Article” to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
            <div className="prose prose-sm max-w-none">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
