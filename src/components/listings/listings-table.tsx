"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Listing, FeePreset } from "@prisma/client";
import { archiveListingAction, duplicateListingAction } from "@/app/app/listings/actions";
import { calculateProfit, DEFAULT_FEE_PRESET } from "@/lib/profit";
import { formatCurrency, formatPercent, parseTags } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ListingsTable({
  listings,
  feePresets,
}: {
  listings: Listing[];
  feePresets: FeePreset[];
}) {
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  function handleListingAction(action: "duplicate" | "archive", id: string) {
    startTransition(async () => {
      const result =
        action === "duplicate"
          ? await duplicateListingAction(id)
          : await archiveListingAction(id);
      setMessage(result.ok ? `Listing ${action}d.` : result.error || `Unable to ${action} listing.`);
    });
  }

  return (
    <Card className="overflow-hidden">
      <div className="hidden md:block">
        <table className="w-full text-sm">
          <thead className="bg-[#fff4ea] text-left text-[var(--muted-foreground)]">
            <tr>
              <th className="px-5 py-4">Listing</th>
              <th className="px-5 py-4">Revenue</th>
              <th className="px-5 py-4">Profit</th>
              <th className="px-5 py-4">Margin</th>
              <th className="px-5 py-4">Season</th>
              <th className="px-5 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => {
              const feePreset = feePresets.find((preset) => preset.id === listing.feePresetId);
              const result = calculateProfit({
                ...DEFAULT_FEE_PRESET,
                ...feePreset,
                ...listing,
              });
              return (
                <tr key={listing.id} className="border-t">
                  <td className="px-5 py-4">
                    <div className="font-semibold">{listing.name}</div>
                    <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                      {parseTags(listing.tags).join(" · ") || "No tags"}
                    </div>
                  </td>
                  <td className="px-5 py-4">{formatCurrency(result.totalRevenue)}</td>
                  <td className="px-5 py-4">{formatCurrency(result.grossProfit)}</td>
                  <td className="px-5 py-4">{formatPercent(result.margin)}</td>
                  <td className="px-5 py-4">{listing.season || "General"}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link href={`/app/listings/${listing.id}`} className="font-semibold text-[var(--secondary)]">
                        View
                      </Link>
                      <button
                        type="button"
                        className="font-semibold text-[var(--secondary)] disabled:opacity-50"
                        onClick={() => handleListingAction("duplicate", listing.id)}
                        disabled={pending}
                      >
                        Duplicate
                      </button>
                      <button
                        type="button"
                        className="font-semibold text-[var(--danger)] disabled:opacity-50"
                        onClick={() => handleListingAction("archive", listing.id)}
                        disabled={pending}
                      >
                        Archive
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 p-4 md:hidden">
        {listings.map((listing) => {
          const feePreset = feePresets.find((preset) => preset.id === listing.feePresetId);
          const result = calculateProfit({
            ...DEFAULT_FEE_PRESET,
            ...feePreset,
            ...listing,
          });
          return (
            <div key={listing.id} className="rounded-3xl border bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">{listing.name}</div>
                  <div className="mt-1 text-xs text-[var(--muted-foreground)]">{listing.sku}</div>
                </div>
                <Badge className="bg-[var(--muted)] text-[var(--foreground)]">
                  {formatPercent(result.margin)}
                </Badge>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span>Profit</span>
                <span className="font-semibold">{formatCurrency(result.grossProfit)}</span>
              </div>
              <div className="mt-4 flex gap-3 text-sm font-semibold">
                <Link href={`/app/listings/${listing.id}`} className="text-[var(--secondary)]">
                  Open
                </Link>
                <button
                  type="button"
                  className="text-[var(--secondary)] disabled:opacity-50"
                  onClick={() => handleListingAction("duplicate", listing.id)}
                  disabled={pending}
                >
                  Duplicate
                </button>
                <button
                  type="button"
                  className="text-[var(--danger)] disabled:opacity-50"
                  onClick={() => handleListingAction("archive", listing.id)}
                  disabled={pending}
                >
                  Archive
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {message ? <div className="border-t px-4 py-3 text-sm text-[var(--muted-foreground)]">{message}</div> : null}
    </Card>
  );
}
