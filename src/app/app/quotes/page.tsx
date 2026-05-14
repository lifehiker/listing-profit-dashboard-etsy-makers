import Link from "next/link";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function QuotesPage() {
  const user = await getSessionUser();
  const quotes = await db.quote.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <Card className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-black">Quotes</h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Turn saved listings into printable custom-order quotes with quantity, rush, shipping, and discount adjustments.
          </p>
        </div>
        <Link href="/app/quotes/new">
          <Button>New quote</Button>
        </Link>
      </Card>
      <div className="grid gap-4">
        {quotes.map((quote) => (
          <Card key={quote.id} className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-semibold">{quote.title}</div>
              <div className="mt-1 text-sm text-[var(--muted-foreground)]">
                {quote.customerName} · {quote.status}
              </div>
            </div>
            <div className="flex gap-3">
              <Link href={`/app/quotes/${quote.id}`} className="text-sm font-semibold text-[var(--secondary)]">
                Edit
              </Link>
              <Link href={`/q/${quote.publicToken}`} className="text-sm font-semibold text-[var(--secondary)]">
                Printable
              </Link>
            </div>
          </Card>
        ))}
      </div>
      <Link href="/api/export/quotes" className="text-sm font-semibold text-[var(--secondary)]">
        Export quotes CSV
      </Link>
    </div>
  );
}
