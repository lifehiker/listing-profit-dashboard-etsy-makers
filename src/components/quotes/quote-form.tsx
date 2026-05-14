"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Listing, Quote, QuoteLineItem } from "@prisma/client";
import { saveQuoteAction } from "@/app/app/quotes/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export function QuoteForm({
  quote,
  listings,
}: {
  quote?: (Quote & { lineItems?: QuoteLineItem[] }) | null;
  listings: Listing[];
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const scratchBaseItem = quote?.lineItems?.find(
    (item) => !["Customization", "Rush fee", "Shipping", "Discount"].includes(item.label),
  );

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold">{quote ? "Edit quote" : "New quote"}</h2>
      <form
        className="mt-5 grid gap-4 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
          startTransition(async () => {
            const result = await saveQuoteAction(payload);
            if (!result.ok) {
              setError(result.error || "Unable to save quote.");
              return;
            }
            router.push("/app/quotes");
            router.refresh();
          });
        }}
      >
        <input type="hidden" name="id" defaultValue={quote?.id} />
        <label className="space-y-2 text-sm font-medium md:col-span-2">
          <span>Quote title</span>
          <Input name="title" defaultValue={quote?.title} required />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Customer name</span>
          <Input name="customerName" defaultValue={quote?.customerName} required />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Customer email</span>
          <Input name="customerEmail" type="email" defaultValue={quote?.customerEmail || ""} />
        </label>
        <label className="space-y-2 text-sm font-medium md:col-span-2">
          <span>Base listing</span>
          <Select name="listingId" defaultValue={quote?.listingId || ""}>
            <option value="">Build from scratch</option>
            {listings.map((listing) => (
              <option key={listing.id} value={listing.id}>
                {listing.name}
              </option>
            ))}
          </Select>
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Scratch quote label</span>
          <Input
            name="baseItemLabel"
            defaultValue={scratchBaseItem?.label || quote?.title}
            placeholder="Custom order base item"
          />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Base item amount</span>
          <Input
            type="number"
            step="0.01"
            name="baseItemAmount"
            defaultValue={scratchBaseItem?.amount ?? 0}
          />
        </label>
        {[
          ["quantity", "Quantity"],
          ["customizationFee", "Customization fee"],
          ["rushFee", "Rush fee"],
          ["shippingCost", "Shipping"],
          ["discountAmount", "Discount"],
        ].map(([field, label]) => (
          <label key={field} className="space-y-2 text-sm font-medium">
            <span>{label}</span>
            <Input type="number" step="0.01" name={field} defaultValue={(quote?.[field as keyof Quote] as string | number | undefined) ?? (field === "quantity" ? 1 : 0)} />
          </label>
        ))}
        <label className="space-y-2 text-sm font-medium">
          <span>Status</span>
          <Select name="status" defaultValue={quote?.status || "draft"}>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="approved">Approved</option>
          </Select>
        </label>
        <label className="space-y-2 text-sm font-medium md:col-span-2">
          <span>Notes</span>
          <Textarea name="notes" defaultValue={quote?.notes || ""} />
        </label>
        {error ? <p className="text-sm text-[var(--danger)] md:col-span-2">{error}</p> : null}
        <div className="md:col-span-2">
          <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save quote"}</Button>
        </div>
      </form>
    </Card>
  );
}
