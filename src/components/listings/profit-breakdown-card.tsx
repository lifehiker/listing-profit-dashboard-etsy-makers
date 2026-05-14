import { calculateProfit, DEFAULT_FEE_PRESET } from "@/lib/profit";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProfitBreakdownCard({
  listing,
  feePreset,
}: {
  listing: {
    salePrice: number;
    shippingCharged: number;
    shippingCost: number;
    materialsCost: number;
    laborMinutes: number;
    laborRate: number;
    packagingCost: number;
    otherCost: number;
    machineMinutes: number;
    machineHourlyRate: number;
  };
  feePreset?: Partial<typeof DEFAULT_FEE_PRESET> | null;
}) {
  const result = calculateProfit({
    ...DEFAULT_FEE_PRESET,
    ...feePreset,
    ...listing,
  });

  return (
    <Card className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Profit breakdown</h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            Shared with the dashboard, calculator, and quote builder.
          </p>
        </div>
        <Badge className="bg-[#fff4ea] text-[var(--primary)]">{result.marginLabel}</Badge>
      </div>
      <div className="space-y-3 text-sm">
        {[
          ["Revenue", result.totalRevenue],
          ["Total fees", result.fees.totalFees],
          ["Labor", result.laborCost],
          ["Machine time", result.machineCost],
          ["Materials", listing.materialsCost],
          ["Shipping", listing.shippingCost],
          ["Packaging", listing.packagingCost],
          ["Other", listing.otherCost],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-[var(--muted-foreground)]">{label}</span>
            <span className="font-semibold">{formatCurrency(Number(value))}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-3xl bg-[var(--muted)] p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Profit / margin</span>
          <span className="text-xl font-black">
            {formatCurrency(result.grossProfit)} · {formatPercent(result.margin)}
          </span>
        </div>
      </div>
    </Card>
  );
}
