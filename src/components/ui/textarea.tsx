import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full rounded-2xl border bg-white px-4 py-3 text-sm shadow-sm transition focus:ring-4",
        className,
      )}
      {...props}
    />
  );
}
