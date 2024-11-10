import { AVAILABLE_STATUSES } from "@/data/invoices";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp
} from "drizzle-orm/pg-core";

export type Status = (typeof AVAILABLE_STATUSES)[number]["id"];

const statuses = AVAILABLE_STATUSES.map(({ id }) => id) as Array<Status>;

export const statusEnum = pgEnum(
  "status",
  statuses as [Status, ...Array<Status>]
);

export const Invoices = pgTable("invoices", {
  id: serial().primaryKey().notNull(),
  createTs: timestamp("create_ts").defaultNow().notNull(),
  value: integer("value").default(0).notNull(),
  description: text("description").default("").notNull(),
  userId: text("user_id").notNull(),
  organizationId: text("organization_id"),
  customerId: integer("customer_id")
    .notNull()
    .references(() => Customers.id),
  status: statusEnum("status").notNull()
});

export const Customers = pgTable("customers", {
  id: serial().primaryKey().notNull(),
  createTs: timestamp("create_ts").defaultNow().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  userId: text("user_id").notNull(),
  organizationId: text("organization_id")
});
