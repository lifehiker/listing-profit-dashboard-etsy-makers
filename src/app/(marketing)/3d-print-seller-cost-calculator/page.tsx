import type { Metadata } from "next";
import { SeoPage } from "@/components/marketing/seo-page";

export const metadata: Metadata = {
  title: "3D Print Seller Cost Calculator",
  description:
    "Free 3D print seller cost calculator for Etsy shops. Estimate material, machine time, labor, shipping, and fees to price listings with confidence.",
};

export default async function Page() {
  return SeoPage({
    eyebrow: "3D print pricing",
    title: "3D print seller cost calculator for Etsy listings with machine time and finishing built in",
    description:
      "If filament cost is the only number in your spreadsheet, you are undercounting. This calculator adds machine time, labor, packaging, Etsy fees, and shipping so you see the real margin.",
    bullets: [
      "Machine-minute inputs help price long-run prints that tie up your printers more than they consume material.",
      "Save reusable defaults for different printers, product families, or batch workflows in the app.",
      "Turn a saved listing into a quote when a customer asks for custom sizes, colors, or rush production.",
    ],
    faq: [
      { q: "Why include machine time?", a: "Long print durations reduce throughput and increase indirect cost even when filament usage looks low." },
      { q: "Can I model custom orders?", a: "Yes. The quote builder adds quantity, customization, rush, shipping, and discount adjustments on top of a saved listing." },
      { q: "What if I sell multiple materials?", a: "Use templates and tags to group different materials, machine defaults, and seasonal categories." },
      { q: "Does this work for print farms?", a: "Yes for basic pricing and quote workflows. Pro plans are a better fit if you need more listings and multiple fee presets." },
    ],
  });
}
