import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <SignIn path="/sign-in" routing="path" />
    </div>
  );
}
