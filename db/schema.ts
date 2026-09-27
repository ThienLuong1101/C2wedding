import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  int,
  timestamp,
} from "drizzle-orm/mysql-core";

export const rsvps = mysqlTable("rsvps", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  contact: varchar("contact", { length: 320 }),
  attending: mysqlEnum("attending", ["yes", "no"]).notNull(),
  guests: int("guests").notNull().default(1),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Rsvp = typeof rsvps.$inferSelect;
export type InsertRsvp = typeof rsvps.$inferInsert;
