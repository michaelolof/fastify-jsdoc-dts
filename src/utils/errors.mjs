import createError from "@fastify/error"

export const errors = /** @type {const}*/ ({
    BadRequestError: createError("BAD_REQUEST_ERROR", "%s", 400)
})

export const errorCodesMap = /** @type {Record<string, string>}*/ ({
    FST_ERR_VALIDATION: "SCHEMA_VALIDATION_ERROR"
})