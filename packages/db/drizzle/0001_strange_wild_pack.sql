CREATE TYPE "public"."beast_skin" AS ENUM('Bat', 'Rat', 'Skeleton', 'Slime', 'Snake', 'Soldier', 'Spider');--> statement-breakpoint
ALTER TABLE "beast_table" ADD COLUMN "skin" "beast_skin" NOT NULL;