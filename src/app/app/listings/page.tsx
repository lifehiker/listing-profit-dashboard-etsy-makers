import Link from "next/link";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/data";
import { ListingsTable } from "@/components/listings/listings-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function ListingsPage() {
  const user = await getSessionUser();
  const [listings, feePresets] = await Promise.all([
    db.listing.findMany({
      where: { userId: user.id, isArchived: false },
      orderBy: { updatedAt: "desc" },
    }),
    db.feePreset.findMany({ where: { userId: user.id } }),
  ]);

  return (
    <div className="space-y-6">
      <Card className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-black">Saved listings</h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Track margin by listing, duplicate winners, and archive products that are no longer active.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/app/import">
            <Button variant="outline">Import CSV</Button>
          </Link>
          <Link href="/app/listings/new">
            <Button>New listing</Button>
          </Link>
        </div>
      </Card>
      <ListingsTable listings={listings} feePresets={feePresets} />
    </div>
  );
}
