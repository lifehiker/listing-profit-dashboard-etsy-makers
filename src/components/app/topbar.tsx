import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export async function Topbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="no-print flex flex-col gap-4 rounded-[28px] border bg-white/70 p-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm text-[var(--muted-foreground)]">Signed in as</p>
        <h1 className="text-xl font-semibold">{session?.user?.name || session?.user?.email}</h1>
      </div>
      <div className="flex gap-3">
        <Link href="/app/listings/new">
          <Button>New listing</Button>
        </Link>
        <Link href="/app/quotes/new">
          <Button variant="outline">New quote</Button>
        </Link>
      </div>
    </div>
  );
}
