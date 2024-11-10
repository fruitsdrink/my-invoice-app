CREATE TYPE "public"."status" AS ENUM('open', 'paid', 'void', 'uncollectible');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
	"id" serial PRIMARY KEY NOT NULL,
	"create_ts" timestamp DEFAULT now() NOT NULL,
	"value" integer DEFAULT 0 NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"status" "status" NOT NULL
);
