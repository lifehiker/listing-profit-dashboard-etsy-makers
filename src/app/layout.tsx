import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/auth/app-providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Listing Profit Dashboard for Etsy Makers",
    template: "%s | Listing Profit Dashboard",
  },
  description:
    "Know the real profit of every Etsy listing. Calculate fees, materials, labor, shipping, quotes, and margins for handmade, 3D print, and laser-cut shops.",
  applicationName: "Listing Profit Dashboard",
  keywords: [
    "etsy listing margin calculator",
    "etsy profit tracker",
    "3d print seller cost calculator",
    "laser cut etsy pricing tool",
    "etsy quote builder",
  ],
  openGraph: {
    title: "Listing Profit Dashboard for Etsy Makers",
    description:
      "Pricing, quoting, and profitability software for Etsy sellers with real listing-level margins.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Listing Profit Dashboard for Etsy Makers",
    description:
      "Calculate Etsy fees, maker costs, and true listing profit before you scale or discount.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
