CREATE TABLE `bag_table` (
	`character_id` text,
	`item_id` text,
	`amount` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`character_id`, `item_id`),
	FOREIGN KEY (`character_id`) REFERENCES `characters_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`item_id`) REFERENCES `item_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `beast_table` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`maxMana` integer NOT NULL,
	`maxLife` integer NOT NULL,
	`intelligence` integer NOT NULL,
	`strength` integer NOT NULL,
	`agility` integer NOT NULL,
	`dexterity` integer NOT NULL,
	`experience` integer
);
--> statement-breakpoint
CREATE TABLE `characters_table` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`name` text NOT NULL,
	`maxMana` integer NOT NULL,
	`mana` integer NOT NULL,
	`maxLife` integer NOT NULL,
	`life` integer NOT NULL,
	`intelligence` integer NOT NULL,
	`strength` integer NOT NULL,
	`agility` integer NOT NULL,
	`dexterity` integer NOT NULL,
	`experience` integer DEFAULT 0,
	FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`authorizationKey` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);--> statement-breakpoint
CREATE TABLE `loot_table` (
	`beast_id` text,
	`item_id` text,
	`amount` integer DEFAULT 1 NOT NULL,
	`chances` integer DEFAULT 100 NOT NULL,
	PRIMARY KEY(`beast_id`, `item_id`),
	FOREIGN KEY (`beast_id`) REFERENCES `beast_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`item_id`) REFERENCES `item_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `item_table` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`intelligence` integer,
	`strength` integer,
	`agility` integer,
	`dexterity` integer,
	`price` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `item_table_name_unique` ON `item_table` (`name`);--> statement-breakpoint
CREATE TABLE `quest_table` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reward_table` (
	`quest_id` text,
	`item_id` text,
	`amount` integer DEFAULT 0,
	PRIMARY KEY(`quest_id`, `item_id`),
	FOREIGN KEY (`quest_id`) REFERENCES `quest_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`item_id`) REFERENCES `item_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `beast_on_step` (
	`beast_id` text,
	`step_id` text,
	`count` integer DEFAULT 1,
	PRIMARY KEY(`step_id`, `beast_id`),
	FOREIGN KEY (`beast_id`) REFERENCES `beast_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`step_id`) REFERENCES `steps_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `steps_table` (
	`id` text PRIMARY KEY NOT NULL,
	`zone` text
);
