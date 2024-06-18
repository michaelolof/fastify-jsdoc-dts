import { getServiceDetails } from "#src/controllers/service/get_details.mjs";
import { defineRouter } from "#src/vendor/fastify_helpers/index.mjs";

const plugin = /** @type {import("@fastify/type-provider-typebox").FastifyPluginAsyncTypebox}*/ async app => {

    const router = defineRouter(app);

    router.get("/service/get_details", getServiceDetails);
};

export default plugin;