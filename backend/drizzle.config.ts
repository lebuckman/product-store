import { defineConfig } from "drizzle-kit";
import { ENV } from "./src/config/env";

export default defineConfig({
    schema: "./src/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: (() => {
            if (!ENV.DATABASE_URL) {
                throw new Error("DATABASE_URL is not set in environment variables");
            }
            return ENV.DATABASE_URL;
        })(),
    },
});
