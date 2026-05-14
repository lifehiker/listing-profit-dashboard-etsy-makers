import type { Prisma } from "@prisma/client";
import { DEFAULT_FEE_PRESET } from "@/lib/profit";

export const defaultFeePreset = {
  name: "Etsy default fees",
  ...DEFAULT_FEE_PRESET,
};

export const sampleTemplates: Prisma.CostTemplateCreateWithoutUserInput[] = [
  {
    name: "3D Print Small Batch",
    defaultLaborRate: 22,
    defaultPackagingCost: 1.8,
    defaultOtherCost: 0.9,
    defaultMachineRate: 3.2,
    notes: "Great for lightweight PLA prints with moderate finishing.",
  },
  {
    name: "Laser Sign Shop",
    defaultLaborRate: 28,
    defaultPackagingCost: 2.5,
    defaultOtherCost: 1.2,
    defaultMachineRate: 8,
    notes: "Built for engraved signs, acrylic, and wood pieces.",
  },
];

export const sampleListings: Prisma.ListingCreateWithoutUserInput[] = [
  {
    name: "Geometric 3D Printed Planter",
    sku: "3DP-PLANTER-01",
    description: "Low-waste planter with drain tray and packaging insert.",
    salePrice: 34,
    shippingCharged: 6.5,
    shippingCost: 5.4,
    materialsCost: 4.2,
    laborMinutes: 18,
    laborRate: 22,
    packagingCost: 1.75,
    otherCost: 0.95,
    machineMinutes: 210,
    machineHourlyRate: 3.2,
    tags: "3d-print,planter,bestseller",
    season: "year-round",
  },
  {
    name: "Laser-Cut Family Name Sign",
    sku: "LASER-SIGN-08",
    description: "Personalized layered wood sign with paint and hanging hardware.",
    salePrice: 78,
    shippingCharged: 12,
    shippingCost: 9.2,
    materialsCost: 13.5,
    laborMinutes: 45,
    laborRate: 28,
    packagingCost: 3.25,
    otherCost: 2.15,
    machineMinutes: 52,
    machineHourlyRate: 8,
    tags: "laser-cut,sign,custom",
    season: "wedding",
  },
  {
    name: "Custom Cake Topper Bundle",
    sku: "HAND-CAKE-03",
    description: "Two-piece topper set for weddings and milestone birthdays.",
    salePrice: 26,
    shippingCharged: 4.5,
    shippingCost: 4.25,
    materialsCost: 2.8,
    laborMinutes: 26,
    laborRate: 24,
    packagingCost: 1.2,
    otherCost: 0.7,
    machineMinutes: 0,
    machineHourlyRate: 0,
    tags: "handmade,cake-topper,custom",
    season: "wedding",
  },
];
