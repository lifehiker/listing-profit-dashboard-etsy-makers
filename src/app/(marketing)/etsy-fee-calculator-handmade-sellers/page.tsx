import type { Metadata } from "next";
import { SeoPage } from "@/components/marketing/seo-page";

export const metadata: Metadata = {
  title: "Etsy Fee Calculator for Handmade Sellers",
  description:
    "Free Etsy fee calculator for handmade sellers. Estimate listing, transaction, payment, and offsite ads fees, then see real profit after labor and materials.",
};

export default async function Page() {
  return SeoPage({
    eyebrow: "Fee calculator",
    title: "Etsy fee calculator for handmade sellers who need profit, not just fee totals",
    description:
      "Most calculators stop at fees. This page keeps going and shows what is actually left after labor, materials, packaging, and shipping take their share.",
    bullets: [
      "Editable Etsy fee defaults, including offsite ads toggle for edge-case profitability checks.",
      "Pairs fee math with material, labor, machine time, and shipping so you can price products responsibly.",
      "Use saved fee presets in the app when your shop has multiple product classes or ad scenarios.",
    ],
    faq: [
      { q: "Does this include payment processing?", a: "Yes. Payment percentage and fixed processing cost are included in the shared calculator logic." },
      { q: "Can I compare fee presets?", a: "In the paid workspace, yes. Free users can test one preset and save up to 3 listings." },
      { q: "Do fees apply to shipping charged?", a: "Yes. The calculator treats shipping charged as part of gross order revenue when estimating Etsy-related fees." },
      { q: "Why include labor?", a: "Because fee-only math often hides the real problem: sellers undercharge on time-intensive items that look healthy on revenue alone." },
    ],
  });
}
