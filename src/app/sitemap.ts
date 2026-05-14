import type { MetadataRoute } from "next";

const routes = [
  "",
  "/pricing",
  "/etsy-listing-margin-calculator",
  "/etsy-fee-calculator-handmade-sellers",
  "/3d-print-seller-cost-calculator",
  "/laser-cut-etsy-pricing-tool",
  "/how-to-price-custom-3d-prints-on-etsy",
  "/how-to-price-laser-cut-products-on-etsy",
  "/compare/craftybase-vs-listing-profit-dashboard",
  "/compare/fablog-vs-listing-profit-dashboard",
  "/templates/custom-order-quote-template-etsy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
