import { Type } from "@sinclair/typebox";
import { defineUserController } from "#src/shared/controllers/user.mjs";
import { defineSchema } from "#src/vendor/fastify_helpers/index.mjs";
import { UserSchema } from "#src/shared/models/users.mjs";

export const getProfileInfoController = defineUserController({

    locals: Type.Object({
        message: Type.String(),
    }),

    schema: defineSchema({
        params: Type.Object({
            id: Type.String(),
        }),

        response: {
            200: Type.Object({
                status: Type.Literal("success"),
                message: Type.String(),
                data: UserSchema,
            }),
        },
    }),

    handler: async(req, res) => {
        // Access to type safe access token
        const token = req.headers["x-user-access-token"];
        console.log(token);
        
        const user = req.locals.user;

        return res.sendCode(200, {
            status: "success",
            message: "User successfully gotten",
            data: user,
        });

    },

});