import { Schema } from "mongoose";
import { Type } from "@sinclair/typebox";

const actionUrlSchema = Type.Object({
    action: Type.String(),
    url: Type.String(),
    meta_name: Type.String(),
    meta: Type.Object(Type.Any()),
    method: Type.String(),
    required_fields: Type.Array(Type.String())
})

