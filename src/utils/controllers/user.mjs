import { Type } from "@sinclair/typebox";
import { defineSchema, useControllerDefinition } from "#src/vendor/fastify_helpers/index.mjs";
import { UserSchema } from "#src/utils/models/users.mjs";
import { AppError } from "#src/utils/errors/types.mjs";
import { errs } from "#src/utils/errors/keys.mjs";
import { throwFn } from "#src/utils/errors/utils.mjs";

export const defineUserController = useControllerDefinition({

    locals: Type.Object({
        user: UserSchema,
    }),

    schema: defineSchema({
        headers: Type.Object({
            "x-user-access-token": Type.String(),
        }),
    }),


    preHandler: [(req, res, next) => {
        // Authenticate user with access token and generate the user object
        const token = req.headers["x-user-access-token"];

        // Throw errors from handlers and prehandlers.
        const user = throwFn(() => verifyUser(token));

        // Pass user to the data field on the request object
        req.locals.user = user;
        
        // Call next middleware
        next();
    }],

});

/**
 * @param {string} token
 * @returns {import("@sinclair/typebox").Static<typeof UserSchema> | AppError}
 */
function verifyUser(token) {
    if (token.length < 3) {
        // Return errors from utility functions.
        return new AppError(errs.NotFound, "User does not exist"); 
    }

    return {
        id: "1234405555",
        first_name: "John",
        last_name: "Doe",
        username: "johndoe",
        iat: "xxxxxxxx",
    };
}