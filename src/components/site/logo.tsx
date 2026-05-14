export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--primary)] text-sm font-black text-white">
        LP
      </div>
      <div>
        <div className="text-sm font-semibold tracking-wide">Listing Profit</div>
        <div className="text-xs text-[var(--muted-foreground)]">For Etsy Makers</div>
      </div>
    </div>
  );
}
