ALTER TABLE "beast_table" ALTER COLUMN "experience" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "beast_table" ALTER COLUMN "experience" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "beast_table" ADD COLUMN "is_boss" boolean DEFAULT false NOT NULL;