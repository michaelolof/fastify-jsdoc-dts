import { Type } from "@sinclair/typebox";
import { defineServiceController } from "#src/utils/controllers/admin.mjs";
import { defineSchema } from "#src/vendor/fastify_helpers/index.mjs";
import { AppError } from "#src/utils/errors/types.mjs";
import { errs } from "#src/utils/errors/keys.mjs";

export const getServiceDetails = defineServiceController({

    schema: defineSchema({
        response: {
            "2XX": Type.Object({
                status: Type.Literal("success"),
                message: Type.String(),
                data: Type.Object({
                    id: Type.String({ examples: ["jx122222"]}),
                    name: Type.String(),
                    quantity: Type.Number(),
                    description: Type.Optional(Type.String()),
                }),
            }),
        },
    }),

    handler: async(req, res) => {

        // Demo how to handle errors
        if (!req.locals.service) {
            throw new AppError(errs.BadRequest, "The defined service is not supported");
        }

        const details = {
            accounts: {
                id: "x1o9111j1222",
                name: "Personal account",
                quantity: 24,
                description: "Conditional statements are awesome",
            },
            payments: {
                id: "dqee1jik122",
                name: "Invoice Payments",
                quantity: 13,
            },
        };

        return res.sendCode(200, {
            status: "success",
            message: "Service details sent successfully",
            data: details[req.locals.service],
        });
    },
});