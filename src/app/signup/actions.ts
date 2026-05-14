"use server";

import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { signupSchema } from "@/lib/schemas";
import { ensureUserSetup } from "@/lib/data";
import { sendEmail } from "@/lib/email";
import { welcomeEmailHtml } from "@/emails/welcome-email";

export async function signupAction(formData: FormData) {
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    shopName: formData.get("shopName"),
  });

  if (!parsed.success) {
    return { ok: false, error: "Please complete all fields." };
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, error: "An account with this email already exists." };
  }

  const passwordHash = await hash(parsed.data.password, 10);
  const user = await db.user.create({
    data: {
      name: parsed.data.name,
      email,
      passwordHash,
      shopName: parsed.data.shopName,
    },
  });

  await ensureUserSetup(user.id);
  await sendEmail({
    to: user.email,
    subject: "Welcome to Listing Profit Dashboard",
    html: welcomeEmailHtml(user.name || "there"),
  });

  revalidatePath("/login");
  return { ok: true };
}
