import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Container } from "@/components/container";
import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";

export default async function Dashboard() {
  const { userId, orgId } = await auth();

  if (!userId) {
    return;
  }

  const result = await db
    .select()
    .from(Invoices)
    .leftJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(
      and(
        eq(Invoices.userId, userId),
        orgId
          ? eq(Invoices.organizationId, orgId)
          : isNull(Invoices.organizationId)
      )
    );

  const invoices = result?.map(({ invoices, customers }) => {
    return {
      ...invoices,
      customer: customers
    };
  });

  // console.log(result);
  return (
    <main className="h-full my-12">
      <Container>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">invoices</h1>
          <p>
            <Button variant={"ghost"} className="inline-flex" asChild>
              <Link href={"/invoices/new"}>
                <CirclePlus className="w-4 h-4" />
                Create Invoice
              </Link>
            </Button>
          </p>
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] p-4">Date</TableHead>
              <TableHead className="p-4">Customer</TableHead>
              <TableHead className="p-4">Email</TableHead>
              <TableHead className="text-center p-4">Status</TableHead>
              <TableHead className="text-right p-4">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="text-left font-medium">
                  <Link
                    href={`/invoices/${row.id}`}
                    className="font-semibold p-4"
                  >
                    {row.createTs.toLocaleDateString()}
                  </Link>
                </TableCell>
                <TableCell className="text-left">
                  <Link
                    href={`/invoices/${row.id}`}
                    className="font-semibold p-4"
                  >
                    {row.customer?.name}
                  </Link>
                </TableCell>
                <TableCell className="text-left">
                  <Link className="p-4" href={`/invoices/${row.id}`}>
                    {row.customer?.email}
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <Link href={`/invoices/${row.id}`} className="p-4">
                    <Badge
                      className={cn(
                        "rounded-full capitalize",
                        row.status === "open" && "bg-blue-500",
                        row.status === "paid" && "bg-green-600",
                        row.status === "void" && "bg-zinc-700",
                        row.status === "uncollectible" && "bg-red-600"
                      )}
                    >
                      {row.status}
                    </Badge>
                  </Link>
                </TableCell>
                <TableCell className="text-right p-4">
                  <Link
                    href={`/invoices/${row.id}`}
                    className="font-semibold p-4 text-right pr-0"
                  >
                    ${(row.value / 100).toFixed(2)}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </main>
  );
}
