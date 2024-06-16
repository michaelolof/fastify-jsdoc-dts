import { Type } from "@sinclair/typebox";
import { defineSchema, useControllerDefinition } from "../../vendor/fastify_helpers/index.mjs";

export const defineServiceController = useControllerDefinition({

    locals: Type.Object({
        service: Type.Union([Type.Literal("accounts"), Type.Literal("payments")])
    }),

    schema: defineSchema({
        headers: Type.Object({
            "x-admin-id": Type.String(),
            "x-admin-secret": Type.String(),
        }),
    }),

    preHandler: [(req, res, next) => {
        const adminId = req.headers["x-admin-id"]
        const adminSecret = req.headers["x-admin-secret"]
        
        // Verify admin id and admin secret
        req.locals.service = "accounts"

        next()
    }]
})

