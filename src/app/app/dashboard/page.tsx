import { db } from "@/lib/db";
import { getSessionUser, getUserPlan, ensureUserSetup } from "@/lib/data";
import { calculateProfit, DEFAULT_FEE_PRESET } from "@/lib/profit";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { KpiCard } from "@/components/app/kpi-card";
import { OnboardingChecklist } from "@/components/onboarding/checklist";
import { Card } from "@/components/ui/card";

export default async function DashboardPage() {
  const user = await getSessionUser();
  await ensureUserSetup(user.id);
  const plan = await getUserPlan(user.id);

  const [listings, feePresets, quoteCount, templateCount] = await Promise.all([
    db.listing.findMany({ where: { userId: user.id, isArchived: false }, orderBy: { updatedAt: "desc" } }),
    db.feePreset.findMany({ where: { userId: user.id } }),
    db.quote.count({ where: { userId: user.id } }),
    db.costTemplate.count({ where: { userId: user.id } }),
  ]);

  const summaries = listings.map((listing) => {
    const preset = feePresets.find((item) => item.id === listing.feePresetId);
    return { listing, result: calculateProfit({ ...DEFAULT_FEE_PRESET, ...preset, ...listing }) };
  });

  const avgMargin = summaries.length
    ? summaries.reduce((sum, item) => sum + item.result.margin, 0) / summaries.length
    : 0;
  const top = summaries.sort((a, b) => b.result.grossProfit - a.result.grossProfit)[0];
  const lowest = [...summaries].sort((a, b) => a.result.margin - b.result.margin)[0];

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Current plan" value={plan.toUpperCase()} help="Upgrade when you need more listings, quotes, or exports." />
        <KpiCard label="Saved listings" value={`${listings.length}`} help="Free tier includes up to 3 saved listings." />
        <KpiCard label="Average margin" value={formatPercent(avgMargin)} help="Across active listings using your current fee presets." />
        <KpiCard label="Quote drafts" value={`${quoteCount}`} help="Use quote builder for custom, rush, or personalized work." />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Profit watchlist</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border bg-white p-5">
              <div className="text-sm text-[var(--muted-foreground)]">Top profitable listing</div>
              <div className="mt-2 text-xl font-bold">{top?.listing.name || "No listings yet"}</div>
              <div className="mt-3 text-sm">
                {top ? `${formatCurrency(top.result.grossProfit)} profit · ${formatPercent(top.result.margin)}` : "Create or import your first listing."}
              </div>
            </div>
            <div className="rounded-3xl border bg-white p-5">
              <div className="text-sm text-[var(--muted-foreground)]">Lowest margin listing</div>
              <div className="mt-2 text-xl font-bold">{lowest?.listing.name || "No listings yet"}</div>
              <div className="mt-3 text-sm">
                {lowest ? `${formatCurrency(lowest.result.grossProfit)} profit · ${formatPercent(lowest.result.margin)}` : "Nothing to review yet."}
              </div>
            </div>
          </div>
        </Card>
        <OnboardingChecklist counts={{ listings: listings.length, templates: templateCount, quotes: quoteCount }} />
      </div>
    </div>
  );
}
