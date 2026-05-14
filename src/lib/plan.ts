export type PlanName = "free" | "standard" | "pro";

export const PLAN_LIMITS: Record<
  PlanName,
  {
    listings: number;
    templates: number;
    csvExport: boolean;
    quotes: boolean;
    reports: boolean;
    feePresets: number;
  }
> = {
  free: {
    listings: 3,
    templates: 1,
    csvExport: false,
    quotes: false,
    reports: false,
    feePresets: 1,
  },
  standard: {
    listings: 50,
    templates: 999,
    csvExport: true,
    quotes: true,
    reports: true,
    feePresets: 2,
  },
  pro: {
    listings: 9999,
    templates: 9999,
    csvExport: true,
    quotes: true,
    reports: true,
    feePresets: 9999,
  },
};

export function normalizePlan(value?: string | null): PlanName {
  if (value === "standard" || value === "pro") {
    return value;
  }
  return "free";
}
