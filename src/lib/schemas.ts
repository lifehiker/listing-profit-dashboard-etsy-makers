import { z } from "zod";
import { DEFAULT_FEE_PRESET } from "@/lib/profit";

const money = z.coerce.number().min(0).max(100000);
const optionalMoney = z.coerce.number().min(0).max(100000).optional().default(0);

export const signupSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  shopName: z.string().min(2).max(80),
});

export const listingSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(120),
  sku: z.string().max(80).optional().or(z.literal("")),
  description: z.string().max(600).optional().or(z.literal("")),
  salePrice: money,
  shippingCharged: optionalMoney,
  shippingCost: optionalMoney,
  materialsCost: optionalMoney,
  laborMinutes: z.coerce.number().int().min(0).max(100000),
  laborRate: optionalMoney,
  packagingCost: optionalMoney,
  otherCost: optionalMoney,
  machineMinutes: z.coerce.number().int().min(0).max(100000).default(0),
  machineHourlyRate: optionalMoney,
  tags: z.string().optional().default(""),
  season: z.string().max(40).optional().or(z.literal("")),
  feePresetId: z.string().optional().or(z.literal("")),
});

export const templateSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(120),
  defaultLaborRate: optionalMoney,
  defaultPackagingCost: optionalMoney,
  defaultOtherCost: optionalMoney,
  defaultMachineRate: optionalMoney,
  notes: z.string().max(400).optional().or(z.literal("")),
});

export const feePresetSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(120),
  listingFee: optionalMoney.default(DEFAULT_FEE_PRESET.listingFee),
  transactionFeePercent: optionalMoney.default(DEFAULT_FEE_PRESET.transactionFeePercent),
  paymentFeePercent: optionalMoney.default(DEFAULT_FEE_PRESET.paymentFeePercent),
  paymentFeeFixed: optionalMoney.default(DEFAULT_FEE_PRESET.paymentFeeFixed),
  offsiteAdsPercent: optionalMoney.default(DEFAULT_FEE_PRESET.offsiteAdsPercent),
  includeOffsiteAds: z
    .union([z.literal("on"), z.literal("true"), z.literal("false"), z.boolean()])
    .transform((value) => value === true || value === "on" || value === "true"),
});

export const quoteSchema = z.object({
  id: z.string().optional(),
  listingId: z.string().optional().or(z.literal("")),
  baseItemLabel: z.string().max(140).optional().or(z.literal("")),
  baseItemAmount: optionalMoney,
  customerName: z.string().min(2).max(120),
  customerEmail: z.string().email().optional().or(z.literal("")),
  title: z.string().min(2).max(140),
  quantity: z.coerce.number().int().min(1).max(1000),
  customizationFee: optionalMoney,
  rushFee: optionalMoney,
  discountAmount: optionalMoney,
  shippingCost: optionalMoney,
  notes: z.string().max(500).optional().or(z.literal("")),
  status: z.enum(["draft", "sent", "approved"]).default("draft"),
});

export const leadSchema = z.object({
  email: z.string().email(),
  source: z.string().min(2).max(80),
});
