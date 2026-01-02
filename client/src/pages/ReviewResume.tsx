import { useAuth } from "@clerk/clerk-react";
import { Edit, Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

import api from "../utils/api";
import type { ContentResponse } from "../types/api";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ReviewResume() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setFile(selected);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload a PDF resume");
      return;
    }

    try {
      setLoading(true);

      const token = await getToken();
      const formData = new FormData();
      formData.append("resume", file);

      const { data } = await api.post<ContentResponse>("/api/ai/review-resume", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setContent(data.content);
        toast.success("Resume reviewed successfully!");
      } else {
        toast.error(data.message || "Failed to review resume");
      }
    } catch {
      toast.error("Unexpected error occurred");
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
          <Sparkles className="size-6 text-[#4a7aff]" />
          <h1 className="text-xl font-semibold">AI Resume Reviewer</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Resume (PDF)</p>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mt-2 w-full rounded-md border border-gray-300 p-2 px-3 text-sm text-gray-600 outline-none"
        />
        <p className="mt-1 text-xs text-gray-500">Maximum file size: 5MB</p>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#226bff] to-[#65adff] px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {loading ? (
            <span className="my-1 size-4 animate-spin rounded-full border-2 border-t-transparent" />
          ) : (
            <Edit className="size-5" />
          )}
          Review Resume
        </button>
      </form>

      <div className="flex max-h-[600px] min-h-96 w-full max-w-lg flex-col rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <Edit className="size-5 text-[#4a7aff]" />
          <h1 className="text-xl font-semibold">Review Result</h1>
        </div>

        {!content ? (
          <div className="flex flex-1 items-center justify-center text-sm text-gray-400">
            <div className="flex flex-col items-center gap-5">
              <Edit className="size-9" />
              <p>Upload a resume and click "Review Resume" to get started</p>
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
