import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Hero } from "@/components/marketing/hero";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { PublicProfitCalculator } from "@/components/calculator/public-profit-calculator";
import { SectionHeading } from "@/components/ui/section-heading";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Calculator"
          title="The free calculator is the top of the funnel and the product demo."
          description="Visitors arrive with one question: am I actually making money on this listing? Give them the answer fast, then offer saved listings, quotes, templates, and reporting."
        />
        <div className="mt-10">
          <PublicProfitCalculator />
        </div>
      </section>
      <FeatureGrid />
      <PricingCards />
    </main>
  );
}
