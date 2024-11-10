"use server";

import { db } from "@/db";
import { Customers, Invoices, Status } from "@/db/schema";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createAction(formData: FormData) {
  const { userId, orgId } = await auth();
  const value = Math.floor(parseFloat(String(formData.get("value"))) * 100);
  const desc = String(formData.get("desc"));
  const name = String(formData.get("name"));
  const email = String(formData.get("email"));

  if (!userId || !name || !email) {
    return;
  }

  let customerId = null;
  const [customer] = await db
    .select()
    .from(Customers)
    .where(
      and(
        eq(Customers.email, email),
        eq(Customers.userId, userId),
        eq(Customers.name, name),
        orgId
          ? eq(Customers.organizationId, orgId)
          : isNull(Customers.organizationId)
      )
    )
    .limit(1);

  if (!customer) {
    const [cus] = await db
      .insert(Customers)
      .values({
        name,
        email,
        userId,
        organizationId: orgId
      })
      .returning({
        id: Customers.id
      });
    customerId = cus.id;
  } else {
    customerId = customer.id;
  }

  const result = await db
    .insert(Invoices)
    .values({
      value,
      description: desc,
      userId,
      customerId,
      organizationId: orgId,
      status: "open"
    })
    .returning({
      id: Invoices.id
    });

  redirect(`/invoices/${result[0].id}`);
}

export async function updateStatusAction(formData: FormData) {
  const { userId } = await auth();

  if (!userId) return;

  const id = formData.get("id") as string;
  const status = formData.get("status") as Status;

  const result = await db
    .update(Invoices)
    .set({
      status: status as any
    })
    .where(and(eq(Invoices.id, parseInt(id)), eq(Invoices.userId, userId)));
  console.log("updateStatusAction", result);
  revalidatePath(`/invoices/${id}`, "page");
}

export async function deleteInvoiceAction(formData: FormData) {
  const { userId } = await auth();

  if (!userId) return;

  const id = formData.get("id") as string;

  if (!id) {
    return;
  }

  const result = await db
    .delete(Invoices)
    .where(and(eq(Invoices.id, parseInt(id)), eq(Invoices.userId, userId)));

  console.log("deleteInvoiceAction", result);

  redirect("/dashboard");
}
