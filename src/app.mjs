import path from "path";
import { fileURLToPath } from "url";
import Fastify from "fastify";
import cors from "@fastify/cors"
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import autolad from "@fastify/autoload";
import { initRouter } from "./vendor/fastify_helpers/index.mjs";
import { errorCodesMap } from "./utils/errors.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @template {import("fastify").FastifyServerOptions} T
 * @param {number} port
 * @param {T} [opts]
 * @returns {import("fastify").FastifyInstance}
 */
export function createApp(port, opts) {
    const app = Fastify(opts).withTypeProvider();

    initRouter(app);

    app.register(cors, {});
    
    app.register(fastifySwagger, {
        openapi: {
            openapi: "3.1.0",
            info: {
                title: "Flowborg API",
                description: "Flowborg User API Documentation",
                version: "1.0.0",
            },
            servers: [
                { url: `http://localhost:${port}`, description: "Local development server" },
            ],
        },
    });

    app.register(fastifySwaggerUi, {
        routePrefix: "/api-docs",
    });

    app.register(autolad, {
        dir: `${__dirname}/routes`,
    });

    app.setErrorHandler((err, req, res) => {
        return res.code(err.statusCode || 500)
        .send({
            status: "error",
            message: err.message,
            code: errorCodesMap[err.code] || err.code,
            data: null
        })
    })

    app.setNotFoundHandler((req, res) => {
        return res.code(404)
        .send({
            status: "error",
            message: "Resource not found",
            code: "NOT_FOUND_ERROR",
            data: null,
        })
    })

    return app
}
