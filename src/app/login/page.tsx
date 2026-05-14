"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center px-6 py-12">
      <Card className="w-full p-8">
        <h1 className="text-3xl font-black">Log in</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Use your email and password. Google sign-in appears automatically when credentials are configured.
        </p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            startTransition(async () => {
              const result = await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirect: false,
                callbackUrl: "/app/dashboard",
              });

              if (result?.error) {
                setError("Invalid credentials.");
                return;
              }

              window.location.href = "/app/dashboard";
            });
          }}
        >
          <label className="block space-y-2 text-sm font-medium">
            <span>Email</span>
            <Input name="email" type="email" required />
          </label>
          <label className="block space-y-2 text-sm font-medium">
            <span>Password</span>
            <Input name="password" type="password" required />
          </label>
          {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Signing in..." : "Log in"}
          </Button>
        </form>
        <div className="mt-6 text-sm text-[var(--muted-foreground)]">
          No account yet? <Link href="/signup" className="font-semibold text-[var(--secondary)]">Start free</Link>
        </div>
      </Card>
    </div>
  );
}
