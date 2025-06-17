CREATE TABLE "beast_skills" (
	"beast_id" text,
	"skill_id" text,
	CONSTRAINT "beast_skills_beast_id_skill_id_pk" PRIMARY KEY("beast_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE "character_skills" (
	"character_id" text,
	"skill_id" text,
	CONSTRAINT "character_skills_character_id_skill_id_pk" PRIMARY KEY("character_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE "quest_steps" (
	"quest_id" text,
	"step_id" text,
	CONSTRAINT "quest_steps_quest_id_step_id_pk" PRIMARY KEY("quest_id","step_id")
);
--> statement-breakpoint
ALTER TABLE "beast_skills" ADD CONSTRAINT "beast_skills_beast_id_beast_table_id_fk" FOREIGN KEY ("beast_id") REFERENCES "public"."beast_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beast_skills" ADD CONSTRAINT "beast_skills_skill_id_skills_table_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "character_skills" ADD CONSTRAINT "character_skills_character_id_characters_table_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "character_skills" ADD CONSTRAINT "character_skills_skill_id_skills_table_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quest_steps" ADD CONSTRAINT "quest_steps_quest_id_quest_table_id_fk" FOREIGN KEY ("quest_id") REFERENCES "public"."quest_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quest_steps" ADD CONSTRAINT "quest_steps_step_id_steps_table_id_fk" FOREIGN KEY ("step_id") REFERENCES "public"."steps_table"("id") ON DELETE cascade ON UPDATE no action;