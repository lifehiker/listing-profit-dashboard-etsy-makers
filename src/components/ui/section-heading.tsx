export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      <p className="text-lg leading-8 text-[var(--muted-foreground)]">{description}</p>
    </div>
  );
}
