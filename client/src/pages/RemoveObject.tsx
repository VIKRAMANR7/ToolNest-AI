import { useAuth } from "@clerk/clerk-react";
import { Scissors, Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import api from "../utils/api";
import type { ContentResponse } from "../types/api";
import { API_ENDPOINTS } from "../config/constants";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function RemoveObject() {
  const [file, setFile] = useState<File | null>(null);
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState("");

  const { getToken } = useAuth();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      toast.error("Please upload a valid image");
      return;
    }

    if (selected.type.includes("heic")) {
      toast.error("HEIC images are not supported");
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      toast.error("Image must be less than 10MB");
      return;
    }

    setFile(selected);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload an image");
      return;
    }

    if (!object.trim()) {
      toast.error("Object name cannot be empty");
      return;
    }

    if (object.trim().split(" ").length > 1) {
      toast.error("Enter only one object name");
      return;
    }

    try {
      setLoading(true);

      const token = await getToken();
      const formData = new FormData();

      formData.append("image", file);
      formData.append("object", object);

      const { data } = await api.post<ContentResponse>(API_ENDPOINTS.REMOVE_OBJECT, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setResultUrl(data.content);
        toast.success("Object removed!");
      } else {
        toast.error(data.message || "Failed to remove object");
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
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-2 w-full rounded-md border border-gray-300 p-2 px-3 text-sm text-gray-600 outline-none"
        />

        <p className="mt-6 text-sm font-medium">Object to Remove</p>
        <textarea
          value={object}
          onChange={(e) => setObject(e.target.value)}
          rows={4}
          className="mt-2 w-full rounded-md border border-gray-300 p-2 px-3 text-sm outline-none"
          placeholder="e.g., watch or spoon — only one object"
          required
        />

        <button
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#417df6] to-[#8e37eb] px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {loading ? (
            <span className="my-1 size-4 animate-spin rounded-full border-2 border-t-transparent" />
          ) : (
            <Scissors className="size-5" />
          )}
          Remove Object
        </button>
      </form>

      <div className="flex min-h-96 w-full max-w-lg flex-col rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <Scissors className="size-5 text-[#4a7aff]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        {!resultUrl ? (
          <div className="flex flex-1 items-center justify-center text-sm text-gray-400">
            <div className="flex flex-col items-center gap-5">
              <Scissors className="size-9" />
              <p>Upload an image and click "Remove Object" to get started</p>
            </div>
          </div>
        ) : (
          <img src={resultUrl} alt="Processed" className="mt-3 rounded-lg" />
        )}
      </div>
    </div>
  );
}
