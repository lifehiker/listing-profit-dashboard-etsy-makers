import { Quote, QuoteLineItem } from "@prisma/client";
import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export function QuotePreview({
  quote,
  items,
}: {
  quote: Quote;
  items: QuoteLineItem[];
}) {
  const total = items.reduce((sum, item) => sum + item.amount * item.quantity, 0);
  const subtotal = items
    .filter((item) => item.amount >= 0)
    .reduce((sum, item) => sum + item.amount * item.quantity, 0);
  const discounts = items
    .filter((item) => item.amount < 0)
    .reduce((sum, item) => sum + item.amount * item.quantity, 0);

  return (
    <Card className="p-7 print:shadow-none">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Printable quote</div>
          <h2 className="mt-2 text-2xl font-black">{quote.title}</h2>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            {quote.customerName} · {quote.status}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-[var(--muted-foreground)]">Total</div>
          <div className="text-3xl font-black">{formatCurrency(total)}</div>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-3 text-sm last:border-b-0">
            <div>{item.label}{item.quantity > 1 ? ` × ${item.quantity}` : ""}</div>
            <div className="font-semibold">{formatCurrency(item.amount * item.quantity)}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-2 rounded-3xl bg-[var(--muted)] p-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-[var(--muted-foreground)]">Subtotal</span>
          <span className="font-semibold">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[var(--muted-foreground)]">Discounts</span>
          <span className="font-semibold">{formatCurrency(discounts)}</span>
        </div>
        <div className="flex items-center justify-between text-base">
          <span className="font-semibold">Quote total</span>
          <span className="text-xl font-black">{formatCurrency(total)}</span>
        </div>
      </div>
      {quote.notes ? <p className="mt-6 text-sm leading-7 text-[var(--muted-foreground)]">{quote.notes}</p> : null}
    </Card>
  );
}
