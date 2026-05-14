import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/data";
import { ListingForm } from "@/components/listings/listing-form";
import { ProfitBreakdownCard } from "@/components/listings/profit-breakdown-card";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getSessionUser();
  const [listing, feePresets] = await Promise.all([
    db.listing.findFirst({ where: { id, userId: user.id } }),
    db.feePreset.findMany({ where: { userId: user.id } }),
  ]);

  if (!listing) {
    notFound();
  }

  const selectedPreset = feePresets.find((preset) => preset.id === listing.feePresetId);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
      <ListingForm listing={listing} feePresets={feePresets} />
      <ProfitBreakdownCard listing={listing} feePreset={selectedPreset} />
    </div>
  );
}
