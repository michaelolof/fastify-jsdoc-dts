import { TObject, TSchema, Type, Static } from "@sinclair/typebox";

const actionUrlSchema = Type.Object({
    action: Type.String({ dbOpts: {} }),
    url: Type.String(),
    meta_name: Type.String(),
    meta: Type.Object(Type.Any()),
    method: Type.Optional(Type.String()),
    required_fields: Type.Array(
        Type.String(), 
        { dbOpts: { default: [] } }
    )
})



export function buildMongoModel<T extends TObject>(obj: T ) {
    const pros = obj.properties
    // @ts-expect-error
    const schema :{ [K in keyof T["properties"]]: T["properties"][K]["dbOpts"] } = {}
    for (const sh in pros) {
        // @ts-expect-error
        schema[sh] = (pros[sh] || {}).dbOpts;
    }
    return schema;
}

const dd = buildMongoModel(actionUrlSchema)

console.log(">>>> dd", dd)