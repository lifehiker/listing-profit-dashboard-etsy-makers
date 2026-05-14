import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/data";
import { ListingForm } from "@/components/listings/listing-form";

export default async function NewListingPage() {
  const user = await getSessionUser();
  const feePresets = await db.feePreset.findMany({ where: { userId: user.id } });

  return <ListingForm feePresets={feePresets} />;
}
