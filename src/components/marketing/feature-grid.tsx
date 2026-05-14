import { BarChart3, Boxes, FileSpreadsheet, Receipt, Tags, WandSparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

const features = [
  {
    icon: WandSparkles,
    title: "Public calculator that converts serious sellers",
    copy: "Launch with a free Etsy margin calculator, then invite users to save listings and templates in a real workspace.",
  },
  {
    icon: Boxes,
    title: "Saved listings with reusable production defaults",
    copy: "Keep material, labor, packaging, and machine assumptions consistent across a growing catalog.",
  },
  {
    icon: Tags,
    title: "Editable Etsy fee presets",
    copy: "Model listing fees, transaction fees, payment processing, and offsite ads without rewriting formulas.",
  },
  {
    icon: Receipt,
    title: "Custom quote builder",
    copy: "Start from a saved listing, add customization and rush fees, then print a clean customer-facing quote page.",
  },
  {
    icon: BarChart3,
    title: "Profit reporting for scale-or-retire decisions",
    copy: "Surface healthy listings, thin margins, and seasonal opportunities without leaving the app.",
  },
  {
    icon: FileSpreadsheet,
    title: "CSV import/export",
    copy: "Bulk set up a catalog, back up your data, and hand it off to spreadsheets when you need to.",
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        eyebrow="Workflow"
        title="Built around the pricing decisions Etsy makers actually make."
        description="The product stays narrow on purpose: listing-level profitability, custom quoting, and production cost clarity."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {features.map(({ icon: Icon, title, copy }) => (
          <Card key={title} className="p-6">
            <Icon className="h-8 w-8 text-[var(--secondary)]" />
            <h3 className="mt-5 text-xl font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{copy}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
