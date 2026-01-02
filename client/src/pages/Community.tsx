import { useAuth, useUser } from "@clerk/clerk-react";
import { Heart, Image as ImageIcon, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type { Creation } from "../types/database";
import api from "../utils/api";
import { API_ENDPOINTS } from "../config/constants";

export default function Community() {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const { getToken } = useAuth();

  async function fetchCreations() {
    try {
      const token = await getToken();

      const response = await api.get(API_ENDPOINTS.PUBLISHED_CREATIONS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const responseData = response.data;
      if (responseData.success && Array.isArray(responseData.creations)) {
        setCreations(responseData.creations);
      } else {
        toast.error("Failed to load community creations");
      }
    } catch {
      toast.error("Failed to load community creations");
    } finally {
      setLoading(false);
    }
  }

  async function toggleLike(id: number) {
    try {
      const token = await getToken();

      const { data } = await api.post(
        API_ENDPOINTS.TOGGLE_LIKE(id),
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success && user) {
        setCreations((prev) =>
          prev.map((c) =>
            c.id === id
              ? {
                  ...c,
                  likes: c.likes.includes(user.id)
                    ? c.likes.filter((uid) => uid !== user.id)
                    : [...c.likes, user.id],
                }
              : c
          )
        );
      }
    } catch {
      toast.error("Failed to update like");
    }
  }

  useEffect(() => {
    if (user) fetchCreations();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="border-primary size-12 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-sm text-gray-600">Loading community creations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="rounded-lg bg-linear-to-br from-purple-500 to-pink-500 p-2">
              <Sparkles className="size-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Community Gallery</h1>
          </div>
          <p className="text-gray-600">Explore creations shared by the community</p>
        </div>

        {creations.length > 0 ? (
          <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3 xl:columns-4">
            {creations.map((creation) => {
              const isLiked = user ? creation.likes.includes(user.id) : false;

              return (
                <div
                  key={creation.id}
                  className="group relative break-inside-avoid overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl"
                >
                  <img
                    src={creation.content}
                    alt={creation.prompt}
                    className="w-full object-cover"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="absolute right-0 bottom-0 left-0 p-4">
                      <p className="mb-3 line-clamp-2 text-sm text-white">{creation.prompt}</p>

                      <button
                        onClick={() => toggleLike(creation.id)}
                        className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur-sm transition-colors hover:bg-white/30"
                      >
                        <Heart
                          className={`size-4 ${
                            isLiked ? "fill-red-500 text-red-500" : "text-white"
                          }`}
                        />
                        <span className="text-sm font-medium text-white">
                          {creation.likes.length}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ImageIcon className="mb-4 size-16 text-gray-300" />
            <h3 className="mb-2 text-xl font-semibold text-gray-700">No Creations Yet</h3>
            <p className="max-w-md text-gray-500">
              Be the first to share your AI-generated images with the community!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
