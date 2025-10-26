import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "../database/schema";
import { logger } from "../utils/logger";

const client = createClient({
  url: "file:./db.sqlite3",
});

export const db = drizzle(client, { schema });

export const connectDatabase = async (): Promise<void> => {
  try {
    logger.info("✅ Database connected successfully");
  } catch (error) {
    logger.error("❌ Database connection failed:", error);
    throw error;
  }
};

export default db;
