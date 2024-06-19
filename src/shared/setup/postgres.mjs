import { getEnv } from "#src/shared/utils/env.mjs";
import postgres from "postgres";

/**
 * @param {"migrations" | "test" | "db"} context
 * @returns {postgres.Sql<{}>}
 */
export function setupDbConnection(context) {
    let max = /** @type {number | undefined}*/  (undefined);
    if (context === "migrations") { // This is a drizzle migrations requirement
        max = 1;
    }

    const conn = postgres({
        user: getEnv("POSTGRES_USER"),
        password: getEnv("POSTGRES_PASSWORD"),
        host: getEnv("POSTGRES_HOST"),
        port: getEnv("POSTGRES_PORT"),
        database: getEnv("POSTGRES_DB"),
        max,
    });

    return conn;
}