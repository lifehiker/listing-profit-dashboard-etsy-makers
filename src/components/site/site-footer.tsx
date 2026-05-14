import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-white/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-[var(--muted-foreground)] md:flex-row md:items-center md:justify-between">
        <div>Listing Profit Dashboard helps Etsy makers price listings with confidence.</div>
        <div className="flex gap-4">
          <Link href="/pricing">Pricing</Link>
          <Link href="/etsy-listing-margin-calculator">Calculator</Link>
          <Link href="/templates/custom-order-quote-template-etsy">Quote template</Link>
        </div>
      </div>
    </footer>
  );
}
