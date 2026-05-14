import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { plan } = await request.json();
  if (plan !== "standard" && plan !== "pro") {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }
  const stripe = getStripe();

  if (!stripe) {
    const existing = await db.subscription.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    const data = {
      plan,
      status: "active",
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
    if (existing) {
      await db.subscription.update({
        where: { id: existing.id },
        data,
      });
    } else {
      await db.subscription.create({
        data: {
          userId: user.id,
          ...data,
        },
      });
    }
    await db.usageEvent.create({
      data: {
        userId: user.id,
        name: "subscription_started",
        metadata: JSON.stringify({ plan, mode: "mock" }),
      },
    });
    return NextResponse.json({ mock: true, redirectUrl: "/app/billing?upgraded=1" });
  }

  const priceId =
    plan === "pro"
      ? process.env.STRIPE_PRICE_PRO_MONTHLY
      : process.env.STRIPE_PRICE_STANDARD_MONTHLY;

  if (!priceId) {
    return NextResponse.json({ error: "Missing price configuration" }, { status: 400 });
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/app/billing?upgraded=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/app/billing`,
    metadata: { userId: user.id, plan, priceId },
  });

  return NextResponse.json({ redirectUrl: checkout.url });
}
