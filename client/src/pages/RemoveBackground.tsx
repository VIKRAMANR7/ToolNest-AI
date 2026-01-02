import { useAuth } from "@clerk/clerk-react";
import { Download, Eraser, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import api from "../utils/api";
import type { ContentResponse } from "../types/api";
import { API_ENDPOINTS } from "../config/constants";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function RemoveBackground() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const { getToken } = useAuth();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image must be less than 10MB");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResultUrl("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Select an image first");
      return;
    }

    try {
      setIsProcessing(true);

      const token = await getToken();
      const formData = new FormData();
      formData.append("image", selectedFile);

      const { data } = await api.post<ContentResponse>(API_ENDPOINTS.REMOVE_BACKGROUND, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        setResultUrl(data.content);
        toast.success("Background removed!");
      } else {
        toast.error(data.message || "Failed to process image");
      }
    } catch {
      toast.error("Unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  }

  function handleDownload() {
    if (!resultUrl) return;

    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = `removed-bg-${Date.now()}.png`;
    link.click();
  }

  function handleReset() {
    setSelectedFile(null);
    setPreviewUrl("");
    setResultUrl("");
  }

  return (
    <div className="min-h-full p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="rounded-lg bg-linear-to-br from-orange-500 to-red-500 p-2">
              <Eraser className="size-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Background Removal</h1>
          </div>
          <p className="text-gray-600">Remove image backgrounds instantly using AI.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="size-5 text-orange-500" />
              <h2 className="text-xl font-semibold">Upload Image</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <label
                htmlFor="file-upload"
                className="block w-full cursor-pointer rounded-lg border-2 border-dashed p-8 text-center hover:border-orange-500"
              >
                {previewUrl ? (
                  <div className="space-y-3">
                    <img src={previewUrl} alt="Preview" className="mx-auto max-h-64 rounded-lg" />
                    <p className="text-sm text-gray-600">{selectedFile?.name}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Eraser className="mx-auto size-12 text-gray-400" />
                    <p className="font-medium text-gray-700">Click to upload image</p>
                    <p className="text-sm text-gray-500">JPG, PNG, WEBP (max 10MB)</p>
                  </div>
                )}
              </label>

              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={!selectedFile || isProcessing}
                  className="flex flex-1 items-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-red-500 px-6 py-3 text-white disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Eraser className="size-5" />
                      Remove Background
                    </>
                  )}
                </button>

                {(previewUrl || resultUrl) && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-lg border px-4 py-3 hover:bg-gray-50"
                  >
                    <Trash2 className="size-5 text-gray-600" />
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eraser className="size-5 text-orange-500" />
                <h2 className="text-xl font-semibold">Result</h2>
              </div>

              {resultUrl && (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200"
                >
                  <Download className="size-4" />
                  Download
                </button>
              )}
            </div>

            <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed bg-gray-50">
              {resultUrl ? (
                <img
                  src={resultUrl}
                  alt="Processed"
                  className="max-h-[500px] max-w-full rounded-lg"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <Eraser className="mx-auto mb-4 size-16 opacity-50" />
                  <p>Your processed image will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
