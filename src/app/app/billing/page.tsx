import { BillingClientPage } from "@/components/billing/billing-client-page";

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ upgraded?: string }>;
}) {
  const { upgraded } = await searchParams;

  return <BillingClientPage upgraded={Boolean(upgraded)} />;
}
