import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/data";
import { QuoteForm } from "@/components/quotes/quote-form";
import { QuotePreview } from "@/components/quotes/quote-preview";

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getSessionUser();
  const [quote, listings] = await Promise.all([
    db.quote.findFirst({
      where: { id, userId: user.id },
      include: { lineItems: true },
    }),
    db.listing.findMany({ where: { userId: user.id, isArchived: false } }),
  ]);

  if (!quote) {
    notFound();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
      <QuoteForm quote={quote} listings={listings} />
      <QuotePreview quote={quote} items={quote.lineItems} />
    </div>
  );
}
