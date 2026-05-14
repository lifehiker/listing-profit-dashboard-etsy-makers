"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { signupAction } from "@/app/signup/actions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <div className="mx-auto flex min-h-screen max-w-lg items-center px-6 py-12">
      <Card className="w-full p-8">
        <h1 className="text-3xl font-black">Start your free workspace</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Create an account to save up to 3 listings, test templates, and explore sample data.
        </p>
        <form
          className="mt-6 grid gap-4 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            setError("");
            const formData = new FormData(event.currentTarget);

            startTransition(async () => {
              const result = await signupAction(formData);
              if (!result.ok) {
                setError(result.error || "Unable to create account.");
                return;
              }

              await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirect: false,
              });
              router.push("/app/dashboard");
            });
          }}
        >
          <label className="space-y-2 text-sm font-medium">
            <span>Your name</span>
            <Input name="name" required />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Shop name</span>
            <Input name="shopName" required />
          </label>
          <label className="space-y-2 text-sm font-medium md:col-span-2">
            <span>Email</span>
            <Input name="email" type="email" required />
          </label>
          <label className="space-y-2 text-sm font-medium md:col-span-2">
            <span>Password</span>
            <Input name="password" type="password" required />
          </label>
          {error ? <p className="text-sm text-[var(--danger)] md:col-span-2">{error}</p> : null}
          <Button type="submit" className="md:col-span-2" disabled={pending}>
            {pending ? "Creating account..." : "Create free account"}
          </Button>
        </form>
        <div className="mt-6 text-sm text-[var(--muted-foreground)]">
          Already have an account? <Link href="/login" className="font-semibold text-[var(--secondary)]">Log in</Link>
        </div>
      </Card>
    </div>
  );
}
