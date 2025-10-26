import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const contacts = sqliteTable("contacts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email"),
  phone: text("phone").notNull(),
  fio: text("fio").notNull(),
  address: text("address").notNull(),
  house: text("house").notNull(),
  agreement: text("agreement").notNull(),
  tags: text("tags", { mode: "json" }).$type<Record<string, any>>(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(current_timestamp)`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(current_timestamp)`
  ),
});

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  count: integer("count").notNull(),
  buyPrice: real("buy_price").notNull(),
  sellPrice: real("sell_price").notNull(),
  marketplace: text("marketplace").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(current_timestamp)`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(current_timestamp)`
  ),
});

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  lastToken: text("last_token"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(current_timestamp)`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(current_timestamp)`
  ),
});

// Типы TypeScript
export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
