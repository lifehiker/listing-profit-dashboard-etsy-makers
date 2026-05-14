import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Craftybase vs Listing Profit Dashboard",
  description:
    "Compare Craftybase vs Listing Profit Dashboard for Etsy sellers who need listing-level profitability and custom quote workflows.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-18">
      <SectionHeading
        eyebrow="Comparison"
        title="Craftybase vs a lighter listing-level profit dashboard"
        description="Craftybase covers broader operational workflows. Listing Profit Dashboard stays tighter on pricing decisions, catalog margin clarity, and custom quote speed."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-xl font-semibold">Where Craftybase is stronger</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted-foreground)]">
            <li>Broader inventory and bookkeeping coverage</li>
            <li>Better fit if you want an operations suite beyond pricing</li>
            <li>Longer-standing brand in handmade seller tooling</li>
          </ul>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold">Where Listing Profit Dashboard is stronger</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted-foreground)]">
            <li>Faster answer to “should I keep selling this listing at this price?”</li>
            <li>Maker-specific inputs like machine time, packaging, and quote adjustments</li>
            <li>SEO-first calculator workflow that becomes a saved catalog and quote tool</li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
