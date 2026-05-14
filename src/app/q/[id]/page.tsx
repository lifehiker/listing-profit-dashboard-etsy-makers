import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PrintButton } from "@/components/quotes/print-button";
import { QuotePreview } from "@/components/quotes/quote-preview";

export default async function PublicQuotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quote = await db.quote.findFirst({
    where: { publicToken: id },
    include: { lineItems: true },
  });

  if (!quote) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="no-print mb-4 flex justify-end">
        <PrintButton />
      </div>
      <QuotePreview quote={quote} items={quote.lineItems} />
    </div>
  );
}
