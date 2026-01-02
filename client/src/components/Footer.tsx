import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { assets, footerLinks } from "../assets/assets";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      toast.success("Thanks for subscribing!");
      setEmail("");
      setSubmitting(false);
    }, 1000);
  };

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="px-6 py-12 md:px-16 lg:px-24 xl:px-32">
        <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/">
              <img src={assets.logo} className="mb-4 h-8" alt="ToolNest AI Logo" />
            </Link>

            <p className="mb-6 text-sm leading-relaxed text-gray-600">
              ToolNest AI helps you generate articles, blog titles, stunning images, remove
              backgrounds, fix photos, and even review resumes — all powered by AI.
            </p>

            <div className="flex items-center gap-4">
              {footerLinks.social.map(({ Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:text-primary text-gray-500 transition-colors"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 font-semibold text-gray-900">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="hover:text-primary text-sm text-gray-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-4 font-semibold text-gray-900">Subscribe to Our Newsletter</h3>
            <p className="mb-4 text-sm text-gray-600">
              Get AI tips, updates, and new tools directly in your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                disabled={submitting}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="focus:ring-primary/50 flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none disabled:bg-gray-100"
              />

              <button
                type="submit"
                disabled={submitting}
                className="bg-primary hover:bg-primary/90 rounded-lg px-6 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 text-sm text-gray-600 md:flex-row">
          <p>© {new Date().getFullYear()} ToolNest AI. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
