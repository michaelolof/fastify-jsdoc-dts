import { getServiceDetails } from "../controllers/service/get_service_details.mjs";
import { defineRouter } from "../vendor/fastify_helpers/index.mjs"

const plugin = /** @type {import("@fastify/type-provider-typebox").FastifyPluginAsyncTypebox}*/ async (app, opts) => {

    const router = defineRouter(app)

    router.get("/service/get_details", getServiceDetails)
}

export default plugin;