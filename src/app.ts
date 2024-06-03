import fastify from "fastify";
import qs from "qs";
import fastifyMultipart from "@fastify/multipart";
import fastifyCors from "@fastify/cors";
import { appConfig, appPluginConfig } from "./config";
import AppDecorators from "./decorators";
import AppPlugins from "./plugins";
import AppRoutes from "./routes";
import AppHooks from "./hooks";
import socketIo from "fastify-socket.io";
import adminAuthDecorator from "./decorators/adminAuth.decorator";
import { RequestUser, RequestWebsite } from "./modules/auth/types";
import fastifySocketIO from "./fastifySocket";
import { Server } from "socket.io";

async function main() {
  const app = fastify({
    logger: appPluginConfig.logger,
    querystringParser: (str) => qs.parse(str.toLowerCase()),
  });

  await app.register(fastifySocketIO, {
    cors: {
      origin: "*",
    },
  });

  await app.register(fastifyCors);

  await app.register(fastifyMultipart, { addToBody: true });

  // register Custom Plugins
  await app.register(AppPlugins);

  await app.register(AppDecorators);

  await app.register(AppHooks);

  await app.register(AppRoutes);
  app.ready((err) => {
    if (err) throw err;
    app.io.on("connection", (socket: any) =>
      console.info("Socket connected!", socket.id)
    );
  });
  app.listen(
    {
      port: appConfig.PORT,
      host: appConfig.HOST,
    },
    (err) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
    }
  );
}

declare module "fastify" {
  export interface FastifyInstance {
    adminauthenticate: typeof adminAuthDecorator;
    io: Server;
  }
  export interface FastifyRequest {
    website: RequestWebsite;
    user: RequestUser;
  }
}

main();
