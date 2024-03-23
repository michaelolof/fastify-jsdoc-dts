import { Type } from "@sinclair/typebox";
import { defineSchema, useControllerDefinition } from "../../vendor/fastify_helpers/index.mjs";
import { UserSchema } from "../models/users.mjs";

export const defineUserController = useControllerDefinition({

    data: Type.Object({
        user: UserSchema
    }),

    schema: defineSchema({
        headers: Type.Object({
            "x-user-access-token": Type.String()
        })
    }),


    preHandler: [(req, res, next) => {
        // Authenticate user with access token and generate the user object
        const token = req.headers["x-user-access-token"];
        const user = {
            id: "1234405555",
            first_name: "John",
            last_name: "Doe",
            username: "johndoe",
            iat: "xxxxxxxx"
        }

        // Pass user to the data field on the request object
        req.data = { user }
        
        // Call next middleware
        next();
    }]

})