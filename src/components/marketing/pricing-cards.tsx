import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

const plans = [
  {
    name: "Free",
    price: "$0",
    subtitle: "For testing real listing math",
    items: ["Public calculator", "Up to 3 saved listings", "1 cost template", "No CSV or quote export"],
  },
  {
    name: "Standard",
    price: "$19/mo",
    subtitle: "For solo shops with active inventory",
    items: ["Up to 50 listings", "Unlimited templates", "Quote builder", "CSV export", "Reporting dashboard"],
  },
  {
    name: "Pro",
    price: "$39/mo",
    subtitle: "For busy shops and custom order volume",
    items: ["Unlimited listings", "Seasonal tags and filters", "Multiple fee presets", "Advanced quote workflows", "Priority support lane"],
  },
];

export function PricingCards() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        eyebrow="Pricing"
        title="Prevent a few underpriced orders and the subscription pays for itself."
        description="Start free, pressure-test your catalog with sample data, and upgrade when you need more listings, exports, and quoting."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <Card
            key={plan.name}
            className={`p-7 ${index === 1 ? "border-[var(--primary)] bg-[#fff4ea]" : ""}`}
          >
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
              {plan.name}
            </div>
            <div className="mt-4 text-4xl font-black">{plan.price}</div>
            <p className="mt-3 text-sm text-[var(--muted-foreground)]">{plan.subtitle}</p>
            <ul className="mt-6 space-y-3 text-sm leading-7">
              {plan.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href={plan.name === "Free" ? "/signup" : "/app/billing"} className="mt-7 block">
              <Button variant={index === 1 ? "primary" : "outline"} className="w-full">
                {plan.name === "Free" ? "Start free" : `Choose ${plan.name}`}
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
