import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/data";
import { FeePresetForm } from "@/components/fees/fee-preset-form";
import { TemplateForm } from "@/components/templates/template-form";
import { Card } from "@/components/ui/card";

export default async function TemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ templateId?: string; presetId?: string }>;
}) {
  const { templateId, presetId } = await searchParams;
  const user = await getSessionUser();
  const [templates, feePresets] = await Promise.all([
    db.costTemplate.findMany({ where: { userId: user.id }, orderBy: { updatedAt: "desc" } }),
    db.feePreset.findMany({ where: { userId: user.id }, orderBy: { updatedAt: "desc" } }),
  ]);
  const selectedTemplate = templates.find((template) => template.id === templateId) ?? null;
  const selectedPreset = feePresets.find((preset) => preset.id === presetId) ?? null;

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="space-y-6">
        <TemplateForm template={selectedTemplate} />
        <div className="grid gap-4">
          {templates.map((template) => (
            <Card key={template.id} className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold">{template.name}</div>
                <a
                  href={`/app/templates?templateId=${template.id}`}
                  className="text-sm font-semibold text-[var(--secondary)]"
                >
                  Edit
                </a>
              </div>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">{template.notes}</p>
            </Card>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <FeePresetForm preset={selectedPreset} />
        <div className="grid gap-4">
          {feePresets.map((preset) => (
            <Card key={preset.id} className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold">{preset.name}</div>
                <a
                  href={`/app/templates?presetId=${preset.id}`}
                  className="text-sm font-semibold text-[var(--secondary)]"
                >
                  Edit
                </a>
              </div>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                {preset.transactionFeePercent}% transaction · {preset.paymentFeePercent}% + ${preset.paymentFeeFixed.toFixed(2)} payment
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
