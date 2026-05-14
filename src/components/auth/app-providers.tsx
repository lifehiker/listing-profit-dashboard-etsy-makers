"use client";

import { SessionProvider } from "next-auth/react";
import { PostHogProvider } from "@/components/analytics/posthog-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PostHogProvider>{children}</PostHogProvider>
    </SessionProvider>
  );
}
