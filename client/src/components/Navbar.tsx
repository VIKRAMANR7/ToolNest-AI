import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleGetStarted(): void {
    if (user) navigate("/ai");
    else openSignIn();
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        <img
          src={assets.logo}
          alt="ToolNest AI"
          className="h-8 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <div className="hidden items-center gap-4 md:flex">
          {isLoaded && (
            <>
              {user ? (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate("/ai")}
                    className="hover:text-primary text-sm text-gray-700 transition"
                  >
                    Dashboard
                  </button>
                  <UserButton />
                </div>
              ) : (
                <button
                  onClick={handleGetStarted}
                  className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-full px-8 py-2.5 text-sm text-white transition-colors"
                >
                  Get Started
                  <ArrowRight className="w-4" />
                </button>
              )}
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden">
          {user ? (
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  navigate("/ai");
                  setMobileMenuOpen(false);
                }}
                className="hover:text-primary text-left text-gray-700 transition"
              >
                Dashboard
              </button>

              <div className="flex items-center gap-2">
                <UserButton />
                <span className="text-sm text-gray-600">{user.firstName}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleGetStarted}
              className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-full px-8 py-2.5 text-sm text-white transition-colors"
            >
              Get Started
              <ArrowRight className="w-4" />
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
