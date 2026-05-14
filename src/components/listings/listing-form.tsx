"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Listing, FeePreset } from "@prisma/client";
import { saveListingAction } from "@/app/app/listings/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export function ListingForm({
  listing,
  feePresets,
}: {
  listing?: Listing | null;
  feePresets: FeePreset[];
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <Card className="p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">{listing ? "Edit listing" : "New listing"}</h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          Capture enough cost detail to make pricing and quoting decisions repeatable.
        </p>
      </div>
      <form
        className="grid gap-4 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const payload = Object.fromEntries(new FormData(form).entries());
          startTransition(async () => {
            const result = await saveListingAction(payload);
            if (!result.ok) {
              setError(result.error || "Unable to save listing.");
              return;
            }
            router.push("/app/listings");
            router.refresh();
          });
        }}
      >
        <input type="hidden" name="id" defaultValue={listing?.id} />
        <label className="space-y-2 text-sm font-medium md:col-span-2">
          <span>Listing name</span>
          <Input name="name" defaultValue={listing?.name} required />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>SKU</span>
          <Input name="sku" defaultValue={listing?.sku || ""} />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Season tag</span>
          <Input name="season" defaultValue={listing?.season || ""} placeholder="wedding, holiday, year-round" />
        </label>
        <label className="space-y-2 text-sm font-medium md:col-span-2">
          <span>Description</span>
          <Textarea name="description" defaultValue={listing?.description || ""} />
        </label>
        {[
          ["salePrice", "Sale price"],
          ["shippingCharged", "Shipping charged"],
          ["shippingCost", "Shipping cost"],
          ["materialsCost", "Materials cost"],
          ["laborMinutes", "Labor minutes"],
          ["laborRate", "Labor rate / hr"],
          ["machineMinutes", "Machine minutes"],
          ["machineHourlyRate", "Machine rate / hr"],
          ["packagingCost", "Packaging cost"],
          ["otherCost", "Other cost"],
        ].map(([field, label]) => (
          <label key={field} className="space-y-2 text-sm font-medium">
            <span>{label}</span>
            <Input type="number" step="0.01" name={field} defaultValue={(listing?.[field as keyof Listing] as string | number | undefined) ?? 0} />
          </label>
        ))}
        <label className="space-y-2 text-sm font-medium">
          <span>Tags</span>
          <Input name="tags" defaultValue={listing?.tags || ""} placeholder="3d-print, custom, bestseller" />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Fee preset</span>
          <Select name="feePresetId" defaultValue={listing?.feePresetId || ""}>
            <option value="">Default Etsy fees</option>
            {feePresets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </Select>
        </label>
        {error ? <p className="text-sm text-[var(--danger)] md:col-span-2">{error}</p> : null}
        <div className="md:col-span-2">
          <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : listing ? "Update listing" : "Create listing"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
