import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  return (
    <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
      <img
        src={assets.logo}
        className="w-52 sm:w-60"
        onClick={() => navigate("/")}
      />
      {user ? (
        <UserButton />
      ) : (
        <button
          onClick={openSignIn}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
        >
          <ArrowRight className="size-4" />
          Get Started
        </button>
      )}
    </div>
  );
}
