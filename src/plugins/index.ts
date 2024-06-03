import type {
  FastifyError,
  FastifyInstance,
  FastifyPluginOptions,
} from "fastify";
import fp from "fastify-plugin";
import errorHandlerPlugin from "./error";
import roleGuardHandlerPlugin from "./guards";

const AppPlugins = fp(function (
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (error?: FastifyError) => void
) {
  app.register(errorHandlerPlugin);
  app.register(roleGuardHandlerPlugin);

  done();
});

export default AppPlugins;
