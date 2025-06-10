ALTER TABLE "public"."skills_table" ALTER COLUMN "animation" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."skills_skin";--> statement-breakpoint
CREATE TYPE "public"."skills_skin" AS ENUM('Heal', 'Darkness');--> statement-breakpoint
ALTER TABLE "public"."skills_table" ALTER COLUMN "animation" SET DATA TYPE "public"."skills_skin" USING "animation"::"public"."skills_skin";