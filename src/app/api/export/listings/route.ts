import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import type { Listing } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserPlan } from "@/lib/data";
import { PLAN_LIMITS } from "@/lib/plan";

const headers: Array<keyof Listing> = [
  "name",
  "sku",
  "description",
  "salePrice",
  "shippingCharged",
  "shippingCost",
  "materialsCost",
  "laborMinutes",
  "laborRate",
  "packagingCost",
  "otherCost",
  "machineMinutes",
  "machineHourlyRate",
  "tags",
  "season",
];

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await db.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const plan = await getUserPlan(user.id);
  if (!PLAN_LIMITS[plan].csvExport) {
    return new NextResponse("Upgrade required", { status: 403 });
  }

  const listings = await db.listing.findMany({
    where: { userId: user.id, isArchived: false },
    orderBy: { updatedAt: "desc" },
  });

  const lines = [
    headers.join(","),
    ...listings.map((listing: Listing) =>
      headers.map((header) => JSON.stringify(String(listing[header] ?? ""))).join(","),
    ),
  ];

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="listings-export.csv"',
    },
  });
}
