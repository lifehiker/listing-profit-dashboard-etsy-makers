"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSessionUser, getUserPlan } from "@/lib/data";
import { PLAN_LIMITS } from "@/lib/plan";
import { feePresetSchema, templateSchema } from "@/lib/schemas";

export async function saveTemplateAction(input: unknown) {
  const user = await getSessionUser();
  const parsed = templateSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Template fields are invalid." };
  }

  const plan = await getUserPlan(user.id);
  const count = await db.costTemplate.count({ where: { userId: user.id } });
  if (!parsed.data.id && count >= PLAN_LIMITS[plan].templates) {
    return { ok: false, error: `Your ${plan} plan does not allow more templates.` };
  }

  if (parsed.data.id) {
    const existing = await db.costTemplate.findFirst({
      where: { id: parsed.data.id, userId: user.id },
    });
    if (!existing) {
      return { ok: false, error: "Template not found." };
    }
    await db.costTemplate.update({
      where: { id: parsed.data.id },
      data: {
        name: parsed.data.name,
        defaultLaborRate: parsed.data.defaultLaborRate,
        defaultPackagingCost: parsed.data.defaultPackagingCost,
        defaultOtherCost: parsed.data.defaultOtherCost,
        defaultMachineRate: parsed.data.defaultMachineRate,
        notes: parsed.data.notes || null,
      },
    });
  } else {
    await db.costTemplate.create({
      data: {
        userId: user.id,
        name: parsed.data.name,
        defaultLaborRate: parsed.data.defaultLaborRate,
        defaultPackagingCost: parsed.data.defaultPackagingCost,
        defaultOtherCost: parsed.data.defaultOtherCost,
        defaultMachineRate: parsed.data.defaultMachineRate,
        notes: parsed.data.notes || null,
      },
    });
  }

  revalidatePath("/app/templates");
  return { ok: true };
}

export async function saveFeePresetAction(input: unknown) {
  const user = await getSessionUser();
  const parsed = feePresetSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Fee preset fields are invalid." };
  }

  const plan = await getUserPlan(user.id);
  const count = await db.feePreset.count({ where: { userId: user.id } });
  if (!parsed.data.id && count >= PLAN_LIMITS[plan].feePresets) {
    return { ok: false, error: `Upgrade to store more than ${PLAN_LIMITS[plan].feePresets} fee presets.` };
  }

  if (parsed.data.id) {
    const existing = await db.feePreset.findFirst({
      where: { id: parsed.data.id, userId: user.id },
    });
    if (!existing) {
      return { ok: false, error: "Fee preset not found." };
    }
    await db.feePreset.update({
      where: { id: parsed.data.id },
      data: parsed.data,
    });
  } else {
    await db.feePreset.create({
      data: {
        userId: user.id,
        ...parsed.data,
      },
    });
  }

  revalidatePath("/app/templates");
  revalidatePath("/app/listings");
  return { ok: true };
}
