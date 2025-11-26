import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  const handleGoBack = () => window.history.back();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="px-4 text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="mt-4 text-3xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="mt-2 mb-8 text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800"
          >
            <Home size={20} />
            Go Home
          </Link>

          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 transition-colors hover:bg-gray-50"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
