import Link from "next/link";
import { PublicProfitCalculator } from "@/components/calculator/public-profit-calculator";
import { LeadCaptureForm } from "@/components/marketing/lead-capture-form";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

export async function SeoPage({
  title,
  description,
  eyebrow,
  bullets,
  faq,
}: {
  title: string;
  description: string;
  eyebrow: string;
  bullets: string[];
  faq: Array<{ q: string; a: string }>;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Listing Profit Dashboard",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description,
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-6 py-18">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                {eyebrow}
              </p>
              <h1 className="text-balance text-4xl font-black tracking-tight md:text-6xl">{title}</h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted-foreground)]">
                {description}
              </p>
              <div className="grid gap-3">
                {bullets.map((bullet) => (
                  <Card key={bullet} className="p-4 text-sm text-[var(--muted-foreground)]">
                    {bullet}
                  </Card>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href="/signup">
                  <Button>Save listings free</Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline">See plans</Button>
                </Link>
              </div>
            </div>
            <PublicProfitCalculator />
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 py-18">
          <SectionHeading
            eyebrow="FAQ"
            title="What sellers usually ask before they commit"
            description="The public calculator is intentionally useful on its own. The paid upgrade starts when you want saved listings, quotes, and repeatable production defaults."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faq.map((item) => (
              <Card key={item.q} className="p-6">
                <h3 className="text-lg font-semibold">{item.q}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{item.a}</p>
              </Card>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 pb-18">
          <Card className="p-6 md:p-8">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h3 className="text-2xl font-semibold">Get the pricing worksheet and launch emails</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
                  Join the beta list for calculator updates, example listings, and the Etsy custom order pricing worksheet.
                </p>
              </div>
              <LeadCaptureForm source={eyebrow} />
            </div>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
