import { Type } from "@sinclair/typebox";
import { defineController, defineSchema } from "../../vendor/fastify_helpers/index.mjs";

const schemas = {
    createUser: defineSchema({
        body: Type.Object({
            title: Type.String(),
            description: Type.String(),
        }),

        response: {
            200: Type.Object({
                id: Type.String(),
                title: Type.String(),
                description: Type.String(),
            }),
        },
    }),
};

export const createUserController = defineController({

    schema: schemas.createUser,

    handler: async(req, res) => {
        
        return res.sendCode(200, {
            id: "1",           
            title: "Stuff",
            description: "three",
        });
    },

});