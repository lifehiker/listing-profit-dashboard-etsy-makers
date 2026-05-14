import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-2xl border bg-white px-4 text-sm shadow-sm transition focus:ring-4",
        className,
      )}
      style={{ boxShadow: "0 1px 0 rgba(36,22,11,.05)", borderColor: "var(--border)" }}
      {...props}
    />
  );
}
