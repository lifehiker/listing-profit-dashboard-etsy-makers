import { Card } from "@/components/ui/card";

export function KpiCard({
  label,
  value,
  help,
}: {
  label: string;
  value: string;
  help: string;
}) {
  return (
    <Card className="p-5">
      <div className="text-sm text-[var(--muted-foreground)]">{label}</div>
      <div className="mt-3 text-3xl font-black">{value}</div>
      <div className="mt-2 text-sm text-[var(--muted-foreground)]">{help}</div>
    </Card>
  );
}
