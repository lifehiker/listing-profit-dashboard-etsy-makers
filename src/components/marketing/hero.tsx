import Link from "next/link";
import { ArrowRight, ChartNoAxesCombined, ReceiptText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-backdrop absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[1.15fr_.85fr] lg:py-28">
        <div className="space-y-7">
          <div className="inline-flex rounded-full border bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--secondary)]">
            Etsy-native profit math for handmade, 3D print, and laser-cut shops
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl text-balance text-5xl font-black tracking-tight md:text-7xl">
              Know the real profit of every Etsy listing before you scale it.
            </h1>
            <p className="max-w-2xl text-xl leading-8 text-[var(--muted-foreground)]">
              Calculate fees, materials, labor, machine time, packaging, shipping, and quote
              adjustments in one workflow. Stop guessing with spreadsheets that ignore Etsy reality.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/etsy-listing-margin-calculator">
              <Button size="lg">
                Try the free calculator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" size="lg">
                Start free workspace
              </Button>
            </Link>
          </div>
          <div className="grid gap-3 text-sm md:grid-cols-3">
            {[
              ["Listing-level clarity", "See which products are healthy, thin, or actively risky."],
              ["Quote-ready pricing", "Turn a saved listing into a printable custom quote in minutes."],
              ["Built for makers", "Handles machine time, packaging, labor, and fee presets."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-3xl border bg-white/60 p-4">
                <div className="font-semibold">{title}</div>
                <div className="mt-2 text-[var(--muted-foreground)]">{copy}</div>
              </div>
            ))}
          </div>
        </div>
        <Card className="relative overflow-hidden p-7">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]" />
          <div className="grid gap-4">
            <div className="flex items-center justify-between rounded-3xl bg-[#fff4ea] p-5">
              <div>
                <div className="text-sm text-[var(--muted-foreground)]">Top listing margin</div>
                <div className="mt-1 text-3xl font-black">42.8%</div>
              </div>
              <ChartNoAxesCombined className="h-8 w-8 text-[var(--secondary)]" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border bg-white p-5">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
                  <ReceiptText className="h-4 w-4 text-[var(--primary)]" />
                  Quote-ready listing
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span>Sale price</span><span>$78.00</span></div>
                  <div className="flex justify-between"><span>Total cost</span><span>$42.70</span></div>
                  <div className="flex justify-between font-semibold"><span>Profit</span><span>$35.30</span></div>
                </div>
              </div>
              <div className="rounded-3xl border bg-white p-5">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
                  <ShieldCheck className="h-4 w-4 text-[var(--success)]" />
                  Seasonal watchlist
                </div>
                <ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
                  <li>Wedding tags boost sign bundle forecasting</li>
                  <li>Rush fee guardrails preserve custom-order margin</li>
                  <li>Offsite ads toggle catches low-margin promos fast</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
