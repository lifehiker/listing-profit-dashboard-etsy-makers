export type FeePresetInput = {
  listingFee: number;
  transactionFeePercent: number;
  paymentFeePercent: number;
  paymentFeeFixed: number;
  offsiteAdsPercent: number;
  includeOffsiteAds: boolean;
};

export type ProfitInput = FeePresetInput & {
  salePrice: number;
  shippingCharged: number;
  shippingCost: number;
  materialsCost: number;
  laborMinutes: number;
  laborRate: number;
  packagingCost: number;
  otherCost: number;
  machineMinutes?: number;
  machineHourlyRate?: number;
};

export function calculateFees(input: ProfitInput) {
  const revenue = input.salePrice + input.shippingCharged;
  const transactionFee = revenue * (input.transactionFeePercent / 100);
  const paymentFee = revenue * (input.paymentFeePercent / 100) + input.paymentFeeFixed;
  const offsiteAdsFee = input.includeOffsiteAds
    ? revenue * (input.offsiteAdsPercent / 100)
    : 0;
  const totalFees = input.listingFee + transactionFee + paymentFee + offsiteAdsFee;

  return {
    listingFee: input.listingFee,
    transactionFee,
    paymentFee,
    offsiteAdsFee,
    totalFees,
  };
}

export function calculateLaborCost(input: Pick<ProfitInput, "laborMinutes" | "laborRate">) {
  return (input.laborMinutes / 60) * input.laborRate;
}

export function calculateMachineCost(
  input: Pick<ProfitInput, "machineMinutes" | "machineHourlyRate">,
) {
  return ((input.machineMinutes || 0) / 60) * (input.machineHourlyRate || 0);
}

export function calculateProfit(input: ProfitInput) {
  const fees = calculateFees(input);
  const laborCost = calculateLaborCost(input);
  const machineCost = calculateMachineCost(input);
  const totalRevenue = input.salePrice + input.shippingCharged;
  const totalCosts =
    fees.totalFees +
    input.materialsCost +
    laborCost +
    input.packagingCost +
    input.otherCost +
    input.shippingCost +
    machineCost;
  const grossProfit = totalRevenue - totalCosts;
  const margin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

  return {
    fees,
    laborCost,
    machineCost,
    totalRevenue,
    totalCosts,
    grossProfit,
    margin,
    marginLabel:
      margin >= 35 ? "Healthy" : margin >= 20 ? "Watch" : margin >= 10 ? "Thin" : "At risk",
    warning:
      margin < 20
        ? "This listing may be too thin once discounts or cost creep hit."
        : "This listing has enough room for growth, promos, or a custom-upcharge buffer.",
  };
}

export function calculateMargin(input: ProfitInput) {
  return calculateProfit(input).margin;
}

export type QuoteTotalsInput = ProfitInput & {
  quantity: number;
  customizationFee: number;
  rushFee: number;
  discountAmount: number;
};

export function buildQuoteTotals(input: QuoteTotalsInput) {
  const base = calculateProfit(input);
  const baseUnitRevenue = input.salePrice + input.shippingCharged;
  const subtotal = baseUnitRevenue * input.quantity;
  const extras = input.customizationFee + input.rushFee;
  const total = Math.max(subtotal + extras - input.discountAmount, 0);
  const estimatedProfit = total - base.totalCosts * input.quantity - input.customizationFee * 0.2;

  return {
    base,
    subtotal,
    extras,
    total,
    discountAmount: input.discountAmount,
    estimatedProfit,
  };
}

export const DEFAULT_FEE_PRESET: FeePresetInput = {
  listingFee: 0.2,
  transactionFeePercent: 6.5,
  paymentFeePercent: 3,
  paymentFeeFixed: 0.25,
  offsiteAdsPercent: 12,
  includeOffsiteAds: false,
};
