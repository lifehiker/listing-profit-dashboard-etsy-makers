import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { normalizePlan } from "@/lib/plan";
import { defaultFeePreset, sampleListings, sampleTemplates } from "@/lib/sample-data";

export async function getSessionUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: {
      subscriptions: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function ensureUserSetup(userId: string) {
  const [presetCount, templateCount, listingCount, subscriptionCount] = await Promise.all([
    db.feePreset.count({ where: { userId } }),
    db.costTemplate.count({ where: { userId } }),
    db.listing.count({ where: { userId } }),
    db.subscription.count({ where: { userId } }),
  ]);

  if (!subscriptionCount) {
    await db.subscription.create({
      data: {
        userId,
        plan: "free",
        status: "free",
      },
    });
  }

  let preset = null;
  if (!presetCount) {
    preset = await db.feePreset.create({
      data: {
        userId,
        ...defaultFeePreset,
      },
    });
  }

  if (!templateCount) {
    await db.costTemplate.createMany({
      data: sampleTemplates.map((template) => ({ userId, ...template })),
    });
  }

  if (!listingCount) {
    const feePreset = preset || (await db.feePreset.findFirst({ where: { userId } }));
    if (feePreset) {
      await db.listing.createMany({
        data: sampleListings.map((listing) => ({
          userId,
          feePresetId: feePreset.id,
          ...listing,
        })),
      });
    }
  }

  await db.user.update({
    where: { id: userId },
    data: { onboardingDone: true },
  });
}

export async function getUserPlan(userId: string) {
  const subscription = await db.subscription.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return normalizePlan(subscription?.plan);
}
