"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const plans = [
  { id: "standard", name: "Standard", price: "$19/mo" },
  { id: "pro", name: "Pro", price: "$39/mo" },
];

export function BillingClientPage({ upgraded }: { upgraded: boolean }) {
  const [message, setMessage] = useState(upgraded ? "Plan updated." : "");
  const [pending, startTransition] = useTransition();

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {plans.map((plan) => (
        <Card key={plan.id} className="p-6">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
            {plan.name}
          </div>
          <div className="mt-3 text-4xl font-black">{plan.price}</div>
          <p className="mt-3 text-sm text-[var(--muted-foreground)]">
            If Stripe keys are missing, checkout uses a local-safe fallback so the app still works end-to-end in development.
          </p>
          <Button
            className="mt-6"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                const response = await fetch("/api/stripe/checkout", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ plan: plan.id }),
                });
                const data = await response.json();
                if (data.redirectUrl) {
                  window.location.href = data.redirectUrl;
                } else {
                  setMessage(data.error || "Unable to start checkout.");
                }
              })
            }
          >
            {pending ? "Working..." : `Choose ${plan.name}`}
          </Button>
        </Card>
      ))}
      {message ? <p className="text-sm text-[var(--muted-foreground)] lg:col-span-2">{message}</p> : null}
    </div>
  );
}
