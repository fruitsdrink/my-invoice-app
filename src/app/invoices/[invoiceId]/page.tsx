import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";
import { notFound } from "next/navigation";

import { Invoice } from "./invoice";

export default async function InvoicePage({
  params
}: {
  params: { invoiceId: string };
}) {
  const { invoiceId } = await params;
  if (isNaN(parseInt(invoiceId))) {
    throw new Error("Invalid invoice ID");
  }
  const { userId, orgId } = await auth();
  if (!userId) return;

  const [result] = await db
    .select()
    .from(Invoices)
    .leftJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(
      and(
        eq(Invoices.id, parseInt(invoiceId)),
        eq(Invoices.userId, userId),
        orgId
          ? eq(Invoices.organizationId, orgId)
          : isNull(Invoices.organizationId)
      )
    )
    .limit(1);

  if (!result) {
    notFound();
  }

  const invoice = {
    ...result.invoices,
    customer: result.customers!
  };
  return <Invoice invoice={invoice} />;
}
