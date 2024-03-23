import Fastify from "fastify"
import { setupDBConnection } from "./utils/dbutils.mjs"
import cors from "@fastify/cors"
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import autolad from "@fastify/autoload";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const port = Number(process.env.PORT) || 5100
const server = Fastify()

server.register(cors, {})
server.register(autolad, {
    dir: `${__dirname}/routes`
})
server.register(fastifySwagger, {
    openapi: {
        openapi: "3.0.3",
        info: {
            title: "Flowborg API",
            description: "Flowborg User API Documentation",
            version: "1.0.0"
        },
        servers: [
            { url: `http://localhost:${port}/api`, description: "Local development server" }
        ]
    }
})
server.register(fastifySwaggerUi, {
    routePrefix: "/api-docs"
})

const startServer = async () => {
    server.get("/ping", (req, res) => {
        return res.send({
            status: "okay"
        })
    })

    await server.ready()
    await setupDBConnection();
    await server.listen({ host: "0.0.0.0", port })
}

const signals = /**@type {const}*/ (["SIGINT", "SIGTERM"]);

signals.forEach(signal => {
    process.on(signal, () => {
        return server
            .close()
            .finally(() => process.exit(0))
    })
})

startServer()
    .then(() => {
        console.log("Server listening on port:", port)
    })
    .catch(handleErr)

/**
 * @param {any} e 
 */
function handleErr(e) {
    console.error(e);
    process.exit(1)
}