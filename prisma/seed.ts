import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { resolveSqliteUrl } from "../src/lib/database-url";
import { defaultFeePreset, sampleListings, sampleTemplates } from "../src/lib/sample-data";

const db = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: resolveSqliteUrl(),
  }),
});

async function main() {
  const demoEmail = "demo@example.com";
  const passwordHash = hashSync("demo1234", 10);

  const user = await db.user.upsert({
    where: { email: demoEmail },
    update: {
      name: "Demo Seller",
      shopName: "Demo Etsy Shop",
      onboardingDone: true,
      passwordHash,
    },
    create: {
      email: demoEmail,
      name: "Demo Seller",
      shopName: "Demo Etsy Shop",
      onboardingDone: true,
      passwordHash,
    },
  });

  const existingPreset = await db.feePreset.findFirst({
    where: { userId: user.id, name: defaultFeePreset.name },
  });

  const preset =
    existingPreset ||
    (await db.feePreset.create({
      data: {
        userId: user.id,
        ...defaultFeePreset,
      },
    }));

  await db.subscription.upsert({
    where: { id: `${user.id}-free-seed` },
    update: {
      plan: "free",
      status: "free",
    },
    create: {
      id: `${user.id}-free-seed`,
      userId: user.id,
      plan: "free",
      status: "free",
    },
  });

  for (const template of sampleTemplates) {
    await db.costTemplate.upsert({
      where: {
        id: `${user.id}-${template.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      },
      update: template,
      create: {
        id: `${user.id}-${template.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        userId: user.id,
        ...template,
      },
    });
  }

  for (const listing of sampleListings) {
    const slug = `${user.id}-${listing.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    const listingData = {
      name: listing.name,
      sku: listing.sku,
      description: listing.description,
      salePrice: listing.salePrice,
      shippingCharged: listing.shippingCharged,
      shippingCost: listing.shippingCost,
      materialsCost: listing.materialsCost,
      laborMinutes: listing.laborMinutes,
      laborRate: listing.laborRate,
      packagingCost: listing.packagingCost,
      otherCost: listing.otherCost,
      machineMinutes: listing.machineMinutes,
      machineHourlyRate: listing.machineHourlyRate,
      tags: listing.tags,
      season: listing.season,
    };
    await db.listing.upsert({
      where: { id: slug },
      update: {
        ...listingData,
        feePresetId: preset.id,
      },
      create: {
        id: slug,
        userId: user.id,
        feePresetId: preset.id,
        ...listingData,
      },
    });
  }

  const baseListing = await db.listing.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });

  if (baseListing) {
    const quoteId = `${user.id}-sample-quote`;
    await db.quote.upsert({
      where: { id: quoteId },
      update: {
        customerName: "Sample Customer",
        customerEmail: "customer@example.com",
        title: "Rush custom planter quote",
        quantity: 2,
        customizationFee: 8,
        rushFee: 12,
        discountAmount: 5,
        shippingCost: 9,
        status: "draft",
        listingId: baseListing.id,
        notes: "Includes color swap and priority turnaround.",
      },
      create: {
        id: quoteId,
        userId: user.id,
        listingId: baseListing.id,
        customerName: "Sample Customer",
        customerEmail: "customer@example.com",
        title: "Rush custom planter quote",
        quantity: 2,
        customizationFee: 8,
        rushFee: 12,
        discountAmount: 5,
        shippingCost: 9,
        status: "draft",
        publicToken: "sample-quote",
        notes: "Includes color swap and priority turnaround.",
      },
    });

    await db.quoteLineItem.deleteMany({
      where: { quoteId },
    });

    await db.quoteLineItem.createMany({
      data: [
        { quoteId, label: baseListing.name, amount: baseListing.salePrice, quantity: 2 },
        { quoteId, label: "Customization", amount: 8, quantity: 1 },
        { quoteId, label: "Rush fee", amount: 12, quantity: 1 },
        { quoteId, label: "Shipping", amount: 9, quantity: 1 },
        { quoteId, label: "Discount", amount: -5, quantity: 1 },
      ],
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
