import { Type } from "@sinclair/typebox";
import { Schema, createConnection } from "mongoose";
import { defineSchema } from "../vendor/fastify_helpers/index.mjs";

export let dbconn = /** @type {import("mongoose").Connection | undefined}*/ (undefined);

export function setupDBConnection() {
    dbconn = createConnection();
    return dbconn.openUri(process.env.DB_URL || "", { autoCreate: true })
        .then((conn) => {
            console.log("Successfully connected to db");
            return conn;
        })
        .catch(err => {
            console.error(err)
        })
}

/**
 * @template {import("@sinclair/typebox").TObject<import("@sinclair/typebox").TProperties>} T
 * @param {T} obj 
 * @param {import("mongoose").SchemaOptions} schemaOpts 
 */
export function buildMongoModel(obj, schemaOpts) {
    const pros = obj.properties
    const table = /** @type {import("@dts/utills.js").MongoModel<T>}*/ ({})
    for (const sh in pros) {
        // @ts-expect-error
        table[sh] = (pros[sh] || {}).dbOpts;
    }
    if (!dbconn) {
        throw new Error("DB connection not setup")
    }

    // return new Schema(table, schemaOpts)
    return table;
}

