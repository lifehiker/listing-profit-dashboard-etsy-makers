import type { Metadata } from "next";
import { SeoPage } from "@/components/marketing/seo-page";

export const metadata: Metadata = {
  title: "Etsy Listing Margin Calculator",
  description:
    "Free Etsy listing margin calculator for handmade, 3D print, and laser-cut sellers. Calculate fees, labor, shipping, and true profit.",
};

export default async function Page() {
  return SeoPage({
    eyebrow: "Free calculator",
    title: "Etsy listing margin calculator with fees, labor, materials, and shipping built in",
    description:
      "Use this calculator to estimate true Etsy listing profit before you scale, discount, or take a custom order. It handles maker-specific costs that broad fee calculators miss.",
    bullets: [
      "Calculate gross profit and margin after Etsy fees, payment processing, shipping, labor, and packaging.",
      "Designed for handmade, 3D print, laser-cut, and custom-order products with variable production costs.",
      "Upgrade only when you want to save listings, reuse templates, export CSV, and build printable quotes.",
    ],
    faq: [
      {
        q: "How accurate is the Etsy fee model?",
        a: "The calculator includes editable defaults for listing, transaction, payment, and optional offsite ads fees. Saved accounts can keep multiple presets.",
      },
      {
        q: "Can I save a result?",
        a: "Free accounts can save up to 3 listings and one fee preset. That is enough to benchmark your core catalog before deciding on a paid plan.",
      },
      {
        q: "Is this just for 3D print sellers?",
        a: "No. The workflow also fits laser-cut, handmade, personalized, and mixed-material shops where labor and shipping vary listing by listing.",
      },
      {
        q: "What happens after the free calculator?",
        a: "You can open a workspace with sample listings, compare margins across products, create quote-ready versions, and export your data when needed.",
      },
    ],
  });
}
