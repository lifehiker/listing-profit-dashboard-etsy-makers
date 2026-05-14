"use client";

import { useState, useTransition } from "react";
import { FeePreset } from "@prisma/client";
import { saveFeePresetAction } from "@/app/app/templates/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function FeePresetForm({ preset }: { preset?: FeePreset | null }) {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold">{preset ? "Edit fee preset" : "New fee preset"}</h3>
      <form
        className="mt-4 grid gap-4 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
          startTransition(async () => {
            const result = await saveFeePresetAction(payload);
            if (!result.ok) {
              setError(result.error || "Unable to save fee preset.");
              return;
            }
            window.location.reload();
          });
        }}
      >
        <input type="hidden" name="id" defaultValue={preset?.id} />
        <label className="space-y-2 text-sm font-medium md:col-span-2">
          <span>Name</span>
          <Input name="name" defaultValue={preset?.name} required />
        </label>
        <Input name="listingFee" type="number" step="0.01" defaultValue={preset?.listingFee ?? 0.2} placeholder="Listing fee" />
        <Input name="transactionFeePercent" type="number" step="0.01" defaultValue={preset?.transactionFeePercent ?? 6.5} placeholder="Transaction %" />
        <Input name="paymentFeePercent" type="number" step="0.01" defaultValue={preset?.paymentFeePercent ?? 3} placeholder="Payment %" />
        <Input name="paymentFeeFixed" type="number" step="0.01" defaultValue={preset?.paymentFeeFixed ?? 0.25} placeholder="Payment fixed" />
        <Input name="offsiteAdsPercent" type="number" step="0.01" defaultValue={preset?.offsiteAdsPercent ?? 12} placeholder="Offsite ads %" />
        <label className="flex items-center gap-3 text-sm font-medium md:col-span-2">
          <input type="checkbox" name="includeOffsiteAds" defaultChecked={preset?.includeOffsiteAds ?? false} />
          Include offsite ads by default
        </label>
        {error ? <p className="text-sm text-[var(--danger)] md:col-span-2">{error}</p> : null}
        <div className="md:col-span-2">
          <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save fee preset"}</Button>
        </div>
      </form>
    </Card>
  );
}
