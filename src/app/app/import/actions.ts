"use server";

import Papa from "papaparse";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSessionUser, getUserPlan } from "@/lib/data";
import { PLAN_LIMITS } from "@/lib/plan";
import { listingSchema } from "@/lib/schemas";

export async function importListingsCsvAction(csv: string) {
  const user = await getSessionUser();
  const plan = await getUserPlan(user.id);
  const parsedCsv = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  const rows = parsedCsv.data
    .map((row) => {
      const record = typeof row === "object" && row ? (row as Record<string, unknown>) : {};
      return listingSchema.safeParse({
        ...record,
        feePresetId: record.feePresetId || "",
      });
    })
    .filter((result) => result.success)
    .map((result) => result.data);

  if (!rows.length) {
    return { ok: false, error: "No valid rows found in the CSV." };
  }

  const existingCount = await db.listing.count({
    where: { userId: user.id, isArchived: false },
  });
  const limit = PLAN_LIMITS[plan].listings;
  if (existingCount + rows.length > limit) {
    return {
      ok: false,
      error: `Import would exceed your ${plan} plan limit of ${limit} active listings.`,
    };
  }

  await db.listing.createMany({
    data: rows.map((row) => ({
      userId: user.id,
      ...row,
      description: row.description || null,
      sku: row.sku || null,
      season: row.season || null,
      feePresetId: row.feePresetId || null,
    })),
  });

  revalidatePath("/app/listings");
  revalidatePath("/app/dashboard");
  return { ok: true, count: rows.length };
}
