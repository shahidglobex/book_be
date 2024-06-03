import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";

import adminAuthDecorator from "./adminAuth.decorator";

const AppDecorators = fp(function (
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (error?: FastifyError) => void
) {
  app.decorate("adminauthenticate", adminAuthDecorator);

  app.after();
  done();
});

export default AppDecorators;
