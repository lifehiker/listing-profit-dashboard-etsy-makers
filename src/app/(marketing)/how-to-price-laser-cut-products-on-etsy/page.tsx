import type { Metadata } from "next";
import { SeoPage } from "@/components/marketing/seo-page";

export const metadata: Metadata = {
  title: "How to Price Laser Cut Products on Etsy",
  description:
    "Learn how to price laser cut Etsy products with materials, machine time, finishing labor, packaging, shipping, and fees included.",
};

export default async function Page() {
  return SeoPage({
    eyebrow: "Guide",
    title: "How to price laser cut products on Etsy when material cost is only half the story",
    description:
      "Laser-cut shops often undercount finishing, assembly, masking, paint, and packaging. This guide keeps those variables visible so your bestsellers do not quietly become margin traps.",
    bullets: [
      "Separate reusable base costs from one-off customization fees so quotes stay fast.",
      "Track seasonal tags like wedding or holiday to identify which products deserve inventory or ad focus.",
      "Use listing duplication to compare sizes, shipping profiles, and layered-material variants before going deeper on production.",
    ],
    faq: [
      { q: "Should I price by minute or by product?", a: "Start with product-level selling price and use machine-minute cost as one input, not the only pricing rule." },
      { q: "What about rush fees?", a: "Rush work is supported in the quote builder so your baseline listing stays clean while custom jobs preserve margin." },
      { q: "Does this help with weddings and events?", a: "Yes. Seasonal tags and quote workflows are designed for exactly those high-customization order types." },
      { q: "Can I export my catalog?", a: "Standard and Pro plans include CSV export so you can analyze or archive the catalog outside the app." },
    ],
  });
}
