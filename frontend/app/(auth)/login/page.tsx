"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";
import { Terminal, Code2 } from "lucide-react";

// Relative imports to fix build errors
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { loginUser } from "@/lib/actions";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      // Removed hardcoded bg-blue-600.
      // Shadcn Button uses 'bg-primary' automatically, which matches your globals.css
      className="w-full h-11 transition-all"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          <span>Signing In...</span>
        </div>
      ) : (
        "Sign In to Dashboard"
      )}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(loginUser, initialState);

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side: Branding & Visuals */}
      {/* Kept dark specifically for contrast, regardless of theme mode */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-950 text-white p-12 relative overflow-hidden">
        {/* Subtle Background Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        </div>

        {/* Logo Area */}
        <div className="relative z-10 flex items-center gap-2 text-xl font-bold tracking-tight">
          {/* Uses your theme primary color */}
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <Terminal className="h-5 w-5" />
          </div>
          <span>CommandCenter</span>
        </div>

        {/* Hero Text */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-bold tracking-tight leading-tight mb-6">
            <span className="text-gradient">
              Make your invisible work visible.
            </span>
          </h1>
          <blockquote className="border-l-2 border-primary pl-6 italic text-zinc-400 text-lg">
            &quot;I finally have a record of the hours I spend architecting,
            learning, and debugging—not just the code I push to GitHub.&quot;
          </blockquote>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center gap-2 text-sm text-zinc-500">
          <Code2 className="h-4 w-4" />
          <span>Built for developers, by developers.</span>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-95 space-y-8">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          <div className="grid gap-6">
            {/* GitHub Button */}
            <Button
              variant="outline"
              className="w-full h-11 relative"
              onClick={() =>
                signIn("github", {
                  callbackUrl: "/dashboard",
                })
              }
            >
              <svg
                className="mr-2 h-5 w-5 absolute left-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.84c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
              Continue with GitHub
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  className="h-11"
                />
              </div>

              {state?.message && (
                // Uses 'destructive' theme color for errors
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md text-center font-medium animate-in fade-in slide-in-from-top-1">
                  {state.message}
                </div>
              )}

              <SubmitButton />
            </form>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              New to CommandCenter?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline transition-all"
              >
                Create an account
              </Link>
            </p>
            <p className="px-8 text-center text-xs text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
