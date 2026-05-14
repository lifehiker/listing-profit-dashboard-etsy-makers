import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/data";
import { QuoteForm } from "@/components/quotes/quote-form";

export default async function NewQuotePage() {
  const user = await getSessionUser();
  const listings = await db.listing.findMany({
    where: { userId: user.id, isArchived: false },
    orderBy: { updatedAt: "desc" },
  });

  return <QuoteForm listings={listings} />;
}
