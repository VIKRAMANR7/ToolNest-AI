import { useClerk, useUser } from "@clerk/clerk-react";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Hero() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  function handleGetStarted(): void {
    if (user) navigate("/ai");
    else openSignIn();
  }

  function handleWatchDemo(): void {
    alert("Demo coming soon!");
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 via-white to-white pt-20">
      <div className="absolute inset-0 bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat opacity-50" />

      <div className="relative z-10 px-4 text-center sm:px-20 xl:px-32">
        <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
          Create Amazing Content
          <br />
          with <span className="text-primary">AI Tools</span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-base text-gray-600 sm:text-lg">
          Transform your content creation with our suite of premium AI tools. Write articles,
          generate images, and enhance your workflow effortlessly.
        </p>

        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={handleGetStarted}
            className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-lg px-8 py-3.5 text-white shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            {user ? "Go to Dashboard" : "Start Creating Now"}
            <ArrowRight className="w-5" />
          </button>

          <button
            onClick={handleWatchDemo}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3.5 text-gray-700 shadow-sm transition-all hover:scale-105 hover:border-gray-400 active:scale-95"
          >
            <Play className="w-5" />
            Watch Demo
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 text-gray-600">
          <img src={assets.user_group} alt="Users" className="h-8" />
          <p className="text-sm font-medium">
            Trusted by <span className="font-semibold text-gray-900">10,000+</span> creators
          </p>
        </div>
      </div>
    </section>
  );
}
