import type { FastifyInstance } from "fastify";
import fastifyGuard from "fastify-guard";
import fp from "fastify-plugin";
import { AppErrors } from "../../lib/errors";

import { AppError } from "../../utils";

async function roleGuardHandlerPlugin(app: FastifyInstance) {
  app.register(fastifyGuard, {
    errorHandler: (result, req, reply) => {
      return reply.send(new AppError(AppErrors.UnAuthorised));
    },
  });
}

export default fp(roleGuardHandlerPlugin);
