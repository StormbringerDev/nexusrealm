CREATE TABLE `characters` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`race` text NOT NULL,
	`subrace` text,
	`class` text NOT NULL,
	`subclass` text,
	`background` text NOT NULL,
	`alignment` text NOT NULL,
	`level` integer DEFAULT 1,
	`xp` integer,
	`str` integer DEFAULT 8,
	`dex` integer DEFAULT 8,
	`con` integer DEFAULT 8,
	`int` integer DEFAULT 8,
	`wis` integer DEFAULT 8,
	`cha` integer DEFAULT 8
);
