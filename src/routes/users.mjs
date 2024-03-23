import { createUserController } from "../controllers/users/create_new.mjs"
import { defineRouter } from "../vendor/fastify_helpers/index.mjs"

const plugin = /** @type {import("@fastify/type-provider-typebox").FastifyPluginAsyncTypebox}*/ async (app, opts) => {

    const router = defineRouter(app)

    router.post("/users/create_new", createUserController)
}

export default plugin;