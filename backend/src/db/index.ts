import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { ENV } from "../config/env";
import * as schema from "./schema";

if (!ENV.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set in environment variables");
}

const pool = new Pool({ connectionString: ENV.DATABASE_URL });

pool.on("error", (err) => {
    console.error("Database connection error: ", err);
});

export const db = drizzle({ client: pool, schema });
