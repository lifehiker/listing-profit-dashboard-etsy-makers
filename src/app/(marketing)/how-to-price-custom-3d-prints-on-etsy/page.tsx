import type { Metadata } from "next";
import Link from "next/link";
import { PublicProfitCalculator } from "@/components/calculator/public-profit-calculator";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How to Price Custom 3D Prints on Etsy",
  description:
    "Learn how to price custom 3D prints on Etsy with material, machine time, labor, shipping, customization, and fees accounted for.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-18">
      <SectionHeading
        eyebrow="Guide"
        title="How to price custom 3D prints on Etsy without guessing"
        description="The mistake most sellers make is treating filament as the whole job cost. Real pricing also needs machine occupancy, post-processing time, packaging, shipping, and a customization buffer."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {[
          "Start with a base listing that has stable material, labor, and machine assumptions.",
          "Add customization and rush fees separately so you can quote special requests without corrupting your standard product margin.",
          "Track profit after Etsy fees and shipping charged, not just gross sales, because custom work often hides thin margins.",
        ].map((tip) => (
          <Card key={tip} className="p-6 text-sm leading-7 text-[var(--muted-foreground)]">
            {tip}
          </Card>
        ))}
      </div>
      <div className="mt-12">
        <PublicProfitCalculator />
      </div>
      <div className="mt-10 flex gap-3">
        <Link href="/signup">
          <Button>Build quotes from saved listings</Button>
        </Link>
        <Link href="/templates/custom-order-quote-template-etsy">
          <Button variant="outline">See the quote template</Button>
        </Link>
      </div>
    </main>
  );
}
