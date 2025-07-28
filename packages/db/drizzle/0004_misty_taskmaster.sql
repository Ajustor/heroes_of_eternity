CREATE TYPE "public"."skills_skin" AS ENUM('Heal', 'Blow', 'Darkness');--> statement-breakpoint
CREATE TABLE "skills_table" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"damages" integer NOT NULL,
	"cost" integer NOT NULL,
	"animation" "skills_skin" NOT NULL,
	"required_level" integer NOT NULL
);
