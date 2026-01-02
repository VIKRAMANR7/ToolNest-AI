import { Protect, useAuth } from "@clerk/clerk-react";
import { Gem, Sparkles } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

import CreationItem from "../components/CreationItem";
import type { Creation } from "../types/database";
import api from "../utils/api";

export default function Dashboard() {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);

  const { isSignedIn, getToken } = useAuth();

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      const token = await getToken();

      const { data } = await api.get("/api/user/creations", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success && Array.isArray(data.creations)) {
        setCreations(data.creations);
      } else {
        setCreations([]);
        toast.error(data.message || "Failed to load creations");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    if (isSignedIn) {
      fetchDashboardData();
    }
  }, [isSignedIn, fetchDashboardData]);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="mb-8 flex flex-wrap justify-start gap-4">
        <div className="flex w-72 items-center justify-between rounded-xl border border-gray-200 bg-white p-4 px-6 shadow-sm">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="flex size-10 items-center justify-center rounded-lg bg-linear-to-r from-[#3588f2] to-[#0bb0d7] text-white">
            <Sparkles className="w-5" />
          </div>
        </div>

        <div className="flex w-72 items-center justify-between rounded-xl border border-gray-200 bg-white p-4 px-6 shadow-sm">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan="premium" fallback={<span>Free</span>}>
                Premium
              </Protect>
            </h2>
          </div>
          <div className="flex size-10 items-center justify-center rounded-lg bg-linear-to-r from-[#ff61c5] to-[#9e53ee] text-white">
            <Gem className="w-5" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex h-3/4 items-center justify-center">
          <div className="border-primary size-12 animate-spin rounded-full border-4 border-t-transparent" />
        </div>
      ) : creations.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">
          No creations yet. Start using ToolNest AI to generate your first creation!
        </p>
      ) : (
        <div className="space-y-3">
          <p className="mt-6 mb-4 font-medium text-gray-700">Recent Creations</p>
          {creations.map((item) => (
            <CreationItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
