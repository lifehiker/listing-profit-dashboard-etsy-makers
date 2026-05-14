"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSessionUser, getUserPlan } from "@/lib/data";
import { PLAN_LIMITS } from "@/lib/plan";
import { quoteSchema } from "@/lib/schemas";

export async function saveQuoteAction(input: unknown) {
  const user = await getSessionUser();
  const plan = await getUserPlan(user.id);
  if (!PLAN_LIMITS[plan].quotes) {
    return { ok: false, error: "Upgrade to Standard or Pro to save quotes." };
  }

  const parsed = quoteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please fix the quote fields." };
  }

  const listing = parsed.data.listingId
    ? await db.listing.findFirst({ where: { id: parsed.data.listingId, userId: user.id } })
    : null;
  const baseLabel = listing?.name || parsed.data.baseItemLabel || parsed.data.title;
  const baseAmount = listing?.salePrice || parsed.data.baseItemAmount;
  const lineItems = [
    { label: baseLabel, amount: baseAmount, quantity: parsed.data.quantity },
    parsed.data.customizationFee
      ? { label: "Customization", amount: parsed.data.customizationFee, quantity: 1 }
      : null,
    parsed.data.rushFee ? { label: "Rush fee", amount: parsed.data.rushFee, quantity: 1 } : null,
    parsed.data.shippingCost
      ? { label: "Shipping", amount: parsed.data.shippingCost, quantity: 1 }
      : null,
    parsed.data.discountAmount
      ? { label: "Discount", amount: -parsed.data.discountAmount, quantity: 1 }
      : null,
  ].filter((item): item is { label: string; amount: number; quantity: number } => Boolean(item));

  if (parsed.data.id) {
    const existing = await db.quote.findFirst({ where: { id: parsed.data.id, userId: user.id } });
    if (!existing) {
      return { ok: false, error: "Quote not found." };
    }
    await db.quote.update({
      where: { id: parsed.data.id },
      data: {
        customerName: parsed.data.customerName,
        customerEmail: parsed.data.customerEmail || null,
        title: parsed.data.title,
        quantity: parsed.data.quantity,
        customizationFee: parsed.data.customizationFee,
        rushFee: parsed.data.rushFee,
        discountAmount: parsed.data.discountAmount,
        shippingCost: parsed.data.shippingCost,
        status: parsed.data.status,
        listingId: parsed.data.listingId || null,
        notes: parsed.data.notes || null,
        lineItems: {
          deleteMany: {},
          create: lineItems,
        },
      },
    });
  } else {
    await db.quote.create({
      data: {
        userId: user.id,
        customerName: parsed.data.customerName,
        customerEmail: parsed.data.customerEmail || null,
        title: parsed.data.title,
        quantity: parsed.data.quantity,
        customizationFee: parsed.data.customizationFee,
        rushFee: parsed.data.rushFee,
        discountAmount: parsed.data.discountAmount,
        shippingCost: parsed.data.shippingCost,
        status: parsed.data.status,
        listingId: parsed.data.listingId || null,
        notes: parsed.data.notes || null,
        lineItems: {
          create: lineItems,
        },
      },
    });
  }

  revalidatePath("/app/quotes");
  revalidatePath("/app/dashboard");
  return { ok: true };
}
