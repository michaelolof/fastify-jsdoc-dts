import { setupServer } from "#src/shared/setup/fastify.mjs";
import closeWithGrace from "close-with-grace";
import dotenv from "dotenv";

dotenv.config();

const port = Number(process.env.PORT) || 5200;
const host = process.env.HOST || "0.0.0.0";

const app = setupServer(port, {
    logger: process.stdout.isTTY ? { transport: { target: "pino-pretty" } } : true,
});

const startServer = async() => {
    app.get("/ping", (req, res) => {
        return res.send({
            status: "okay",
        });
    });
    
    await app.ready();
    await app.listen({ host, port });
};

closeWithGrace(async({ signal, err }) => {
    if (err) {
        app.log.error({ err }, "server closing with error");
    } else {
        app.log.info(`${ signal } received, server closing`);
    }
    await app.close();
});

startServer()
    .then(() => {
        console.log("Server listening on port:", port);
    })
    .catch(e => {
        console.error(e);
        process.exit(1);
    });