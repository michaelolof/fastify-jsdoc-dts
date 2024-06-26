import { createUserController } from "#src/controllers/users/create_new.mjs";
import { getProfileInfoController } from "#src/controllers/users/get_profile_info.mjs";
import { defineRouter } from "#src/vendor/fastify_helpers/index.mjs";

const plugin = /** @type {import("@fastify/type-provider-typebox").FastifyPluginAsyncTypebox}*/ async app => {
    const router = defineRouter(app);

    router.get("/users/get_profile_info/:id", getProfileInfoController);
    router.post("/users/create_new", createUserController);
};

export default plugin;