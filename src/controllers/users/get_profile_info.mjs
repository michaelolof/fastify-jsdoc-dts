import { Type } from "@sinclair/typebox";
import { defineUserController } from "../../utils/controllers/user.mjs";
import { defineSchema } from "../../vendor/fastify_helpers/index.mjs";
import { UserSchema } from "../../utils/models/users.mjs";

export const getProfileInfoController = defineUserController({

    data: Type.Object({
        message: Type.String()
    }),

    schema: defineSchema({
        params: Type.Object({
            id: Type.String()
        }),

        response: {
            200: Type.Object({
                status: Type.Literal("success"),
                message: Type.String(),
                data: UserSchema
            })
        }
    }),

    handler: async(req, res) => {
        // Access to type safe access token
        const token = req.headers["x-user-access-token"]

        const user = req.data.user;

        return res.send({
            status: "success",
            message: "User successfully gotten",
            data: user
        })

    }

})