import { TObject, TProperties } from "@sinclair/typebox"

export type MongoModel<T extends TObject[TProperties]> = {
    [K in keyof T["properties"]]: T["properties"][K]
}