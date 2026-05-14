import { PricingCards } from "@/components/marketing/pricing-cards";
import { SectionHeading } from "@/components/ui/section-heading";

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-18">
      <SectionHeading
        eyebrow="Pricing"
        title="Choose the plan that matches your catalog size and quoting volume."
        description="The free tier exists to prove the math. Paid plans unlock enough saved listings, exports, and quote workflows for real shops."
      />
      <PricingCards />
    </main>
  );
}
