import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Custom Order Quote Template for Etsy",
  description:
    "Free custom order quote template for Etsy sellers. Build clean quote pages for handmade, laser-cut, and 3D print custom work.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-18">
      <SectionHeading
        eyebrow="Template"
        title="Custom order quote template for Etsy sellers"
        description="Custom work gets messy fast when pricing lives in DMs. This template page shows the structure a customer-facing quote should have, and the app turns saved listings into printable quote pages."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-[.95fr_1.05fr]">
        <Card className="p-7">
          <div className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
            Quote layout
          </div>
          <ul className="space-y-4 text-sm leading-7 text-[var(--muted-foreground)]">
            <li>Customer name, project title, and order context</li>
            <li>Base listing price with quantity multiplier</li>
            <li>Customization fee, rush fee, shipping, and discount lines</li>
            <li>Status marker for draft, sent, or approved</li>
            <li>Printable notes block for production or customer handoff</li>
          </ul>
        </Card>
        <Card className="p-7">
          <div className="rounded-3xl border bg-white p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
              Example quote
            </div>
            <h3 className="mt-3 text-2xl font-black">Layered family sign, 18 inch</h3>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><span>Quantity</span><span>1</span></div>
              <div className="flex justify-between"><span>Base listing</span><span>$78.00</span></div>
              <div className="flex justify-between"><span>Customization</span><span>$18.00</span></div>
              <div className="flex justify-between"><span>Rush fee</span><span>$15.00</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>$12.00</span></div>
              <div className="flex justify-between font-semibold"><span>Total</span><span>$123.00</span></div>
            </div>
          </div>
        </Card>
      </div>
      <div className="mt-10 flex gap-3">
        <Link href="/signup">
          <Button>Use the built-in quote builder</Button>
        </Link>
        <Link href="/app/quotes/new">
          <Button variant="outline">Open demo quote flow</Button>
        </Link>
      </div>
    </main>
  );
}
