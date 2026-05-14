import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "FabLog vs Listing Profit Dashboard",
  description:
    "Compare FabLog vs Listing Profit Dashboard for Etsy makers who need fee-aware listing-level profitability and custom quotes.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-18">
      <SectionHeading
        eyebrow="Comparison"
        title="FabLog vs an Etsy-native margin and quote workflow"
        description="FabLog validates maker costing demand. Listing Profit Dashboard narrows the product around Etsy fee structures, listing views, and storefront profitability decisions."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-xl font-semibold">Where FabLog is stronger</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted-foreground)]">
            <li>Broader generic maker costing orientation</li>
            <li>General production use cases outside Etsy storefront economics</li>
            <li>Useful if your workflow is less listing-centric</li>
          </ul>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold">Where Listing Profit Dashboard is stronger</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted-foreground)]">
            <li>Etsy fee presets and shipping-aware listing margin reporting</li>
            <li>Custom quote builder for special-order Etsy conversations</li>
            <li>Public SEO calculators that match how sellers already search for help</li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
