"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { z } from "zod";
import { listingSchema } from "@/lib/schemas";
import { calculateProfit, DEFAULT_FEE_PRESET } from "@/lib/profit";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const calculatorSchema = listingSchema.pick({
  salePrice: true,
  shippingCharged: true,
  shippingCost: true,
  materialsCost: true,
  laborMinutes: true,
  laborRate: true,
  packagingCost: true,
  otherCost: true,
  machineMinutes: true,
  machineHourlyRate: true,
});

type Values = z.infer<typeof calculatorSchema>;

const defaultValues: Values = {
  salePrice: 34,
  shippingCharged: 6.5,
  shippingCost: 5.2,
  materialsCost: 4.1,
  laborMinutes: 18,
  laborRate: 22,
  packagingCost: 1.8,
  otherCost: 0.9,
  machineMinutes: 210,
  machineHourlyRate: 3.2,
};

export function PublicProfitCalculator({
  ctaHref = "/signup",
  ctaLabel = "Save this listing",
}: {
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const { status } = useSession();
  const form = useForm<z.input<typeof calculatorSchema>, undefined, Values>({
    resolver: zodResolver(calculatorSchema),
    defaultValues,
    mode: "onChange",
  });

  const rawValues = useWatch({
    control: form.control,
  });
  const values = useMemo(() => {
    const parsed = calculatorSchema.safeParse(rawValues);
    return parsed.success ? parsed.data : defaultValues;
  }, [rawValues]);
  const result = useMemo(
    () =>
      calculateProfit({
        ...DEFAULT_FEE_PRESET,
        ...values,
      }),
    [values],
  );
  const resolvedHref = status === "authenticated" ? "/app/listings/new" : ctaHref;
  const resolvedLabel = status === "authenticated" ? "Save this in my workspace" : ctaLabel;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_.95fr]">
      <Card className="p-6 md:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Free Etsy listing margin calculator</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
              Adjust materials, labor, machine time, packaging, shipping, and Etsy fees. The
              exact same formula powers the saved listings dashboard and quote builder.
            </p>
          </div>
          <div className="rounded-2xl bg-[var(--muted)] px-4 py-3 text-right">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
              Margin
            </div>
            <div className="text-2xl font-black">{formatPercent(result.margin)}</div>
          </div>
        </div>
        <form className="grid gap-4 md:grid-cols-2">
          {[
            ["salePrice", "Sale price"],
            ["shippingCharged", "Shipping charged"],
            ["shippingCost", "Shipping cost"],
            ["materialsCost", "Materials cost"],
            ["laborMinutes", "Labor minutes"],
            ["laborRate", "Labor rate / hr"],
            ["machineMinutes", "Machine minutes"],
            ["machineHourlyRate", "Machine rate / hr"],
            ["packagingCost", "Packaging"],
            ["otherCost", "Other cost"],
          ].map(([name, label]) => (
            <label key={name} className="space-y-2 text-sm font-medium">
              <span>{label}</span>
              <Input type="number" step="0.01" {...form.register(name as keyof Values)} />
            </label>
          ))}
        </form>
      </Card>
      <Card className="p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-[var(--secondary)]" />
          <div>
            <h3 className="text-xl font-semibold">Profit breakdown</h3>
            <p className="text-sm text-[var(--muted-foreground)]">Net after fees and production costs.</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            ["Revenue", result.totalRevenue],
            ["Etsy fees", result.fees.totalFees],
            ["Materials", values.materialsCost || 0],
            ["Labor", result.laborCost],
            ["Machine time", result.machineCost],
            ["Packaging", values.packagingCost || 0],
            ["Shipping", values.shippingCost || 0],
            ["Other", values.otherCost || 0],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between text-sm">
              <span className="text-[var(--muted-foreground)]">{label}</span>
              <span className="font-semibold">{formatCurrency(Number(value))}</span>
            </div>
          ))}
          <div className="rounded-3xl bg-[var(--muted)] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Estimated profit</span>
              <span className="text-2xl font-black">{formatCurrency(result.grossProfit)}</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-[var(--accent)]" />
              <span>{result.warning}</span>
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <Link href={resolvedHref}>
            <Button className="w-full" size="lg">
              {resolvedLabel}
            </Button>
          </Link>
          <p className="text-xs leading-5 text-[var(--muted-foreground)]">
            Free accounts can save up to 3 listings, create one fee preset, and test the full
            pricing workflow before upgrading.
          </p>
        </div>
      </Card>
    </div>
  );
}
