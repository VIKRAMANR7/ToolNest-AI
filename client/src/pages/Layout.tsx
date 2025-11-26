import { useUser } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Sidebar from "../components/Sidebar";

export default function Layout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="size-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <nav className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <img
            src={assets.logo}
            alt="ToolNest AI"
            className="h-8 cursor-pointer"
            onClick={() => navigate("/")}
          />

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isSidebarOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar sidebar={isSidebarOpen} setSidebar={setIsSidebarOpen} />

        <main className="flex-1 overflow-y-auto bg-[#f4f7fb]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
