import dotenv from "dotenv";
import { getEnv } from "./src/shared/utils/env.mjs";
import { defineConfig } from "drizzle-kit";

dotenv.config();


export default defineConfig({
    schema: "./src/db/schema.mjs",
    dialect: "postgresql",
    out: "./src/db/gen/drizzle",
    dbCredentials: {
        user: getEnv("POSTGRES_USER"),
        password: getEnv("POSTGRES_PASSWORD"),
        host: getEnv("POSTGRES_HOST"),
        port: getEnv("POSTGRES_PORT"),
        database: getEnv("POSTGRES_DB"),
    },
    verbose: true,
    strict: true,
});