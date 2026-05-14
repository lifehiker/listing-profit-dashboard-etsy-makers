import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";

export function OnboardingChecklist({
  counts,
}: {
  counts: { listings: number; templates: number; quotes: number };
}) {
  const items = [
    { label: "Review sample listings", done: counts.listings >= 3, href: "/app/listings" },
    { label: "Save or edit a cost template", done: counts.templates > 0, href: "/app/templates" },
    { label: "Build your first quote", done: counts.quotes > 0, href: "/app/quotes/new" },
  ];

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Launch checklist</h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            The free workspace starts with realistic Etsy examples so you can move fast.
          </p>
        </div>
        <span className="rounded-full bg-[var(--muted)] px-3 py-1 text-xs font-semibold">
          {items.filter((item) => item.done).length}/{items.length}
        </span>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center justify-between rounded-2xl border bg-white px-4 py-3"
          >
            <div className="flex items-center gap-3">
              {item.done ? (
                <CheckCircle2 className="h-5 w-5 text-[var(--success)]" />
              ) : (
                <Circle className="h-5 w-5 text-[var(--muted-foreground)]" />
              )}
              <span>{item.label}</span>
            </div>
            <span className="text-sm font-semibold text-[var(--secondary)]">Open</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
