import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";

export async function SiteHeader() {
  const session = await getServerSession(authOptions);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-white/40 bg-[#f8f1e8]/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--muted-foreground)] md:flex">
          <Link href="/etsy-listing-margin-calculator">Calculator</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/how-to-price-custom-3d-prints-on-etsy">Guides</Link>
          <Link href="/compare/craftybase-vs-listing-profit-dashboard">Compare</Link>
        </nav>
        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <Link href="/app/dashboard" className="text-sm font-semibold">
                Dashboard
              </Link>
              <form action="/api/auth/signout" method="post">
                <Button variant="outline" size="sm">
                  Sign out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold">
                Log in
              </Link>
              <Link href="/signup">
                <Button size="sm">Start free</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
