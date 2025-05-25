CREATE TYPE "public"."characters_job" AS ENUM('freelance');--> statement-breakpoint
CREATE TYPE "public"."characters_skin" AS ENUM('Claude', 'Eric', 'Jane', 'Serge');--> statement-breakpoint
CREATE TYPE "public"."zone" AS ENUM('Body', 'Chaos', 'Dark');--> statement-breakpoint
CREATE TABLE "bag_table" (
	"character_id" text,
	"item_id" text,
	"amount" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "bag_table_character_id_item_id_pk" PRIMARY KEY("character_id","item_id")
);
--> statement-breakpoint
CREATE TABLE "beast_table" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"maxMana" integer NOT NULL,
	"maxLife" integer NOT NULL,
	"intelligence" integer NOT NULL,
	"strength" integer NOT NULL,
	"agility" integer NOT NULL,
	"dexterity" integer NOT NULL,
	"experience" integer
);
--> statement-breakpoint
CREATE TABLE "characters_table" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"name" text NOT NULL,
	"level" integer NOT NULL,
	"job" characters_job DEFAULT 'freelance' NOT NULL,
	"skin" characters_skin DEFAULT 'Claude' NOT NULL,
	"maxMana" integer NOT NULL,
	"mana" integer NOT NULL,
	"maxLife" integer NOT NULL,
	"life" integer NOT NULL,
	"intelligence" integer NOT NULL,
	"strength" integer NOT NULL,
	"agility" integer NOT NULL,
	"dexterity" integer NOT NULL,
	"experience" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "users_table" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"authorizationKey" text,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "loot_table" (
	"beast_id" text,
	"item_id" text,
	"amount" integer DEFAULT 1 NOT NULL,
	"chances" integer DEFAULT 100 NOT NULL,
	CONSTRAINT "loot_table_beast_id_item_id_pk" PRIMARY KEY("beast_id","item_id")
);
--> statement-breakpoint
CREATE TABLE "item_table" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"intelligence" integer,
	"strength" integer,
	"agility" integer,
	"dexterity" integer,
	"price" integer,
	CONSTRAINT "item_table_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "quest_table" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reward_table" (
	"quest_id" text,
	"item_id" text,
	"amount" integer DEFAULT 0,
	CONSTRAINT "reward_table_quest_id_item_id_pk" PRIMARY KEY("quest_id","item_id")
);
--> statement-breakpoint
CREATE TABLE "beast_on_step" (
	"beast_id" text,
	"step_id" text,
	"count" integer DEFAULT 1,
	CONSTRAINT "beast_on_step_step_id_beast_id_pk" PRIMARY KEY("step_id","beast_id")
);
--> statement-breakpoint
CREATE TABLE "steps_table" (
	"id" text PRIMARY KEY NOT NULL,
	"zone" "zone"
);
--> statement-breakpoint
ALTER TABLE "bag_table" ADD CONSTRAINT "bag_table_character_id_characters_table_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bag_table" ADD CONSTRAINT "bag_table_item_id_item_table_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "characters_table" ADD CONSTRAINT "characters_table_userId_users_table_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loot_table" ADD CONSTRAINT "loot_table_beast_id_beast_table_id_fk" FOREIGN KEY ("beast_id") REFERENCES "public"."beast_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loot_table" ADD CONSTRAINT "loot_table_item_id_item_table_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reward_table" ADD CONSTRAINT "reward_table_quest_id_quest_table_id_fk" FOREIGN KEY ("quest_id") REFERENCES "public"."quest_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reward_table" ADD CONSTRAINT "reward_table_item_id_item_table_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beast_on_step" ADD CONSTRAINT "beast_on_step_beast_id_beast_table_id_fk" FOREIGN KEY ("beast_id") REFERENCES "public"."beast_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beast_on_step" ADD CONSTRAINT "beast_on_step_step_id_steps_table_id_fk" FOREIGN KEY ("step_id") REFERENCES "public"."steps_table"("id") ON DELETE cascade ON UPDATE no action;