import { Type } from "@sinclair/typebox";
import { defineServiceController } from "../../utils/controllers/admin.mjs";
import { defineSchema } from "../../vendor/fastify_helpers/index.mjs";

export const getServiceDetails = defineServiceController({

    schema: defineSchema({
        response: {
            200: Type.Object({
                status: Type.Literal("success"),
                message: Type.String(),
                data: Type.Object({
                    id: Type.String({ examples: ["jx122222"]}),
                    name: Type.String(),
                    quantity: Type.Number(),
                    description: Type.Optional(Type.String()),
                })
            })
        }
    }),

    handler: async(req, res) => {
        const details = {
            "accounts": {
                id: "x1o9111j1222",
                name: "Personal account",
                quantity: 24,
                description: "Conditional statements are awesome",
            },
            "payments": {
                id: "dqee1jik122",
                name: "Invoice Payments",
                quantity: 13,
            },
        }

        return res.send({
            status: "success",
            message: "Service details sent successfully",
            data: details[req.locals.service]
        })
    },
})