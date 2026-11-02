import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const responses = sqliteTable("responses", {
  id: text("id").primaryKey(),
  problem: text("problem").notNull(),
  desiredChange: text("desired_change").notNull(),
  frequency: text("frequency").notNull(),
  benefit: text("benefit").notNull(),
  currentWay: text("current_way").notNull().default(""),
  locale: text("locale").notNull().default("fr"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
