CREATE TABLE `responses` (
	`id` text PRIMARY KEY NOT NULL,
	`problem` text NOT NULL,
	`desired_change` text NOT NULL,
	`frequency` text NOT NULL,
	`benefit` text NOT NULL,
	`current_way` text DEFAULT '' NOT NULL,
	`locale` text DEFAULT 'fr' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
