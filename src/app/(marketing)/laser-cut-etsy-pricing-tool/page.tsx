import type { Metadata } from "next";
import { SeoPage } from "@/components/marketing/seo-page";

export const metadata: Metadata = {
  title: "Laser Cut Etsy Pricing Tool",
  description:
    "Free laser cut Etsy pricing tool for signs, ornaments, acrylic products, and custom work. Estimate machine time, labor, materials, fees, shipping, and margin.",
};

export default async function Page() {
  return SeoPage({
    eyebrow: "Laser pricing",
    title: "Laser cut Etsy pricing tool for signs, custom names, ornaments, and mixed-material products",
    description:
      "Laser shops often juggle materials, finishing time, hardware, packaging, and rush jobs. This pricing tool pulls those variables into one Etsy-native profit view.",
    bullets: [
      "Useful for wood, acrylic, layered signs, ornaments, wedding items, and small-batch custom products.",
      "Supports machine rate assumptions plus labor-heavy finishing and assembly work.",
      "Pro plan adds seasonal tags, multiple fee presets, and deeper catalog management.",
    ],
    faq: [
      { q: "Can I use this for personalized signs?", a: "Yes. Save a base listing, then layer customization fees and rush changes through the quote builder." },
      { q: "What if my shipping costs change by size?", a: "Use listing duplicates and quote adjustments to compare shipping-sensitive product variants." },
      { q: "Is packaging included?", a: "Yes. Packaging is a first-class input because custom and fragile items can have meaningfully different packing cost." },
      { q: "How is this different from generic maker costing tools?", a: "The workflow is tuned for Etsy listing decisions, fee structures, public calculators, and quoting rather than generic manufacturing jobs." },
    ],
  });
}
