import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { BarChart3, CreditCard, FileSpreadsheet, LayoutDashboard, Package, Receipt, Settings2 } from "lucide-react";
import { Logo } from "@/components/site/logo";

const links: Array<[string, string, LucideIcon]> = [
  ["Dashboard", "/app/dashboard", LayoutDashboard],
  ["Listings", "/app/listings", Package],
  ["Templates", "/app/templates", Settings2],
  ["Quotes", "/app/quotes", Receipt],
  ["Import", "/app/import", FileSpreadsheet],
  ["Billing", "/app/billing", CreditCard],
];

export function AppSidebar() {
  return (
    <aside className="no-print w-full rounded-[28px] border bg-white/70 p-5 lg:w-72">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="mb-8 rounded-3xl bg-[#fff4ea] p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <BarChart3 className="h-4 w-4 text-[var(--secondary)]" />
          Margin-first workflow
        </div>
        <p className="text-sm leading-6 text-[var(--muted-foreground)]">
          Save listings, review cost assumptions, and quote custom work from the same source data.
        </p>
      </div>
      <nav className="grid gap-2">
        {links.map(([label, href, Icon]) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--muted-foreground)] transition hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
