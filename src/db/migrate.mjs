import { setupDbConnection } from "#src/shared/setup/postgres.mjs";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import dotenv from "dotenv";

dotenv.config();

const db = drizzle(setupDbConnection("migrations"));

async function main() {
    console.log("Started running migrations...");
    await migrate(db, { migrationsFolder: "./src/db/gen/drizzle" });
    console.log("Finished running migrations...");
}

main()
    .then(() => {
        console.log("Exiting process");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });