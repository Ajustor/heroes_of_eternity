ALTER TABLE "item_table" ALTER COLUMN "intelligence" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "item_table" ALTER COLUMN "strength" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "item_table" ALTER COLUMN "agility" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "item_table" ALTER COLUMN "dexterity" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "item_table" ALTER COLUMN "price" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "item_table" ADD COLUMN "heal" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "item_table" ADD COLUMN "damage" integer DEFAULT 0;