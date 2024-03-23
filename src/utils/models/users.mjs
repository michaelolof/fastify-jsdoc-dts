import { Type } from "@sinclair/typebox";

export const UserSchema = Type.Object({
    id: Type.String(),
    first_name: Type.String(),
    last_name: Type.String(),
    username: Type.String(),
    iat: Type.String(),
})