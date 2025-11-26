import { useAuth, RedirectToSignIn } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return <Outlet />;
}
