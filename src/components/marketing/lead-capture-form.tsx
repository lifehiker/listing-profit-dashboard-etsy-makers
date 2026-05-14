"use client";

import { useState, useTransition } from "react";
import { captureLeadAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LeadCaptureForm({ source }: { source: string }) {
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
        startTransition(async () => {
          const result = await captureLeadAction({ ...payload, source });
          setMessage(
            result.ok
              ? "Thanks. We’ll send calculator updates and templates."
              : result.error || "Unable to save your email.",
          );
          if (result.ok) {
            event.currentTarget.reset();
          }
        });
      }}
    >
      <Input name="email" type="email" required placeholder="Your email for templates and product updates" />
      <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Get updates"}</Button>
      {message ? <p className="text-xs text-[var(--muted-foreground)] sm:col-span-2">{message}</p> : null}
    </form>
  );
}
