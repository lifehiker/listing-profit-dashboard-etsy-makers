import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: true, skipped: true });
  }

  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;

      if (userId && (plan === "standard" || plan === "pro")) {
        const existing = await db.subscription.findFirst({
          where: { userId },
          orderBy: { createdAt: "desc" },
        });
        const data = {
          plan,
          status: "active",
          stripeCustomerId:
            typeof session.customer === "string" ? session.customer : existing?.stripeCustomerId,
          stripeSubscriptionId:
            typeof session.subscription === "string"
              ? session.subscription
              : existing?.stripeSubscriptionId,
          stripePriceId: session.metadata?.priceId || existing?.stripePriceId || null,
        };

        if (existing) {
          await db.subscription.update({
            where: { id: existing.id },
            data,
          });
        } else {
          await db.subscription.create({
            data: {
              userId,
              ...data,
            },
          });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch {
    return new NextResponse("Invalid signature", { status: 400 });
  }
}
