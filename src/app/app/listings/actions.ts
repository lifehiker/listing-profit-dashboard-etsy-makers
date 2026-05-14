"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSessionUser, getUserPlan } from "@/lib/data";
import { PLAN_LIMITS } from "@/lib/plan";
import { listingSchema } from "@/lib/schemas";

export async function saveListingAction(input: unknown) {
  const user = await getSessionUser();
  const parsed = listingSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: "Please fix the listing fields." };
  }

  const plan = await getUserPlan(user.id);
  const limit = PLAN_LIMITS[plan].listings;
  const count = await db.listing.count({ where: { userId: user.id, isArchived: false } });

  if (!parsed.data.id && count >= limit) {
    return { ok: false, error: `Your ${plan} plan supports up to ${limit} active listings.` };
  }

  const data = {
    name: parsed.data.name,
    salePrice: parsed.data.salePrice,
    shippingCharged: parsed.data.shippingCharged,
    shippingCost: parsed.data.shippingCost,
    materialsCost: parsed.data.materialsCost,
    laborMinutes: parsed.data.laborMinutes,
    laborRate: parsed.data.laborRate,
    packagingCost: parsed.data.packagingCost,
    otherCost: parsed.data.otherCost,
    machineMinutes: parsed.data.machineMinutes,
    machineHourlyRate: parsed.data.machineHourlyRate,
    tags: parsed.data.tags,
    sku: parsed.data.sku || null,
    description: parsed.data.description || null,
    season: parsed.data.season || null,
    feePresetId: parsed.data.feePresetId || null,
  };

  if (parsed.data.id) {
    const existing = await db.listing.findFirst({ where: { id: parsed.data.id, userId: user.id } });
    if (!existing) {
      return { ok: false, error: "Listing not found." };
    }
    await db.listing.update({
      where: { id: parsed.data.id },
      data,
    });
  } else {
    await db.listing.create({
      data: {
        userId: user.id,
        ...data,
      },
    });
  }

  revalidatePath("/app/listings");
  revalidatePath("/app/dashboard");
  return { ok: true };
}

export async function duplicateListingAction(id: string) {
  const user = await getSessionUser();
  const plan = await getUserPlan(user.id);
  const listing = await db.listing.findFirst({ where: { id, userId: user.id } });
  if (!listing) {
    return { ok: false, error: "Listing not found." };
  }

  const activeCount = await db.listing.count({ where: { userId: user.id, isArchived: false } });
  if (activeCount >= PLAN_LIMITS[plan].listings) {
    return { ok: false, error: `Your ${plan} plan supports up to ${PLAN_LIMITS[plan].listings} active listings.` };
  }

  await db.listing.create({
    data: {
      userId: listing.userId,
      feePresetId: listing.feePresetId,
      name: `${listing.name} Copy`,
      sku: listing.sku,
      description: listing.description,
      salePrice: listing.salePrice,
      shippingCharged: listing.shippingCharged,
      shippingCost: listing.shippingCost,
      materialsCost: listing.materialsCost,
      laborMinutes: listing.laborMinutes,
      laborRate: listing.laborRate,
      packagingCost: listing.packagingCost,
      otherCost: listing.otherCost,
      machineMinutes: listing.machineMinutes,
      machineHourlyRate: listing.machineHourlyRate,
      tags: listing.tags,
      season: listing.season,
      isArchived: false,
    },
  });
  revalidatePath("/app/listings");
  revalidatePath("/app/dashboard");
  return { ok: true };
}

export async function archiveListingAction(id: string) {
  const user = await getSessionUser();
  const existing = await db.listing.findFirst({ where: { id, userId: user.id } });
  if (!existing) {
    return { ok: false, error: "Listing not found." };
  }
  await db.listing.update({
    where: { id },
    data: { isArchived: true },
  });
  revalidatePath("/app/listings");
  revalidatePath("/app/dashboard");
  revalidatePath(`/app/listings/${id}`);
  return { ok: true };
}
