"use server";

import { db } from "@/lib/db";
import { leadSchema } from "@/lib/schemas";

export async function captureLeadAction(input: unknown) {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Enter a valid email address." };
  }

  await db.leadCapture.create({
    data: {
      email: parsed.data.email.toLowerCase(),
      source: parsed.data.source,
    },
  });

  return { ok: true };
}
