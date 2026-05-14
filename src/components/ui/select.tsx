import { cn } from "@/lib/utils";

export function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn("h-11 w-full rounded-2xl border bg-white px-4 text-sm shadow-sm", className)}
      {...props}
    />
  );
}
