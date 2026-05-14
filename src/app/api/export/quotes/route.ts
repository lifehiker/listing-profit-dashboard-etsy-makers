import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import type { Quote } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserPlan } from "@/lib/data";
import { PLAN_LIMITS } from "@/lib/plan";

const headers: Array<keyof Quote> = [
  "title",
  "customerName",
  "customerEmail",
  "quantity",
  "customizationFee",
  "rushFee",
  "discountAmount",
  "shippingCost",
  "status",
  "notes",
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

  const quotes = await db.quote.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  const lines = [
    headers.join(","),
    ...quotes.map((quote: Quote) =>
      headers.map((header) => JSON.stringify(String(quote[header] ?? ""))).join(","),
    ),
  ];

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="quotes-export.csv"',
    },
  });
}
