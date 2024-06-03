import type {
  FastifyError,
  FastifyInstance,
  FastifyPluginOptions,
} from "fastify";
import {
  refreshTokenHandlerAdmin,
  signInHandlerAdmin,
  signInHandlerUser,
  signOutHandlerAdmin,
} from "./auth.controller";
import { RefreshTokenSchema, SignInSchema } from "./schemas";

function AuthRoutes(
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (error?: FastifyError) => void
) {
  /*
   *admin signin
   */
  app.route({
    method: "POST",
    url: "/signin-admin",
    schema: SignInSchema,
    handler: signInHandlerAdmin,
  });

  app.route({
    method: "POST",
    url: "/signin-user",
    schema: SignInSchema,
    handler: signInHandlerUser,
  });

  /*
   *admin signout
   */
  app.route({
    method: "GET",
    url: "/signout",
    onRequest: [app.adminauthenticate],
    handler: signOutHandlerAdmin,
  });

  /*
   * player refresh token
   */

  app.route({
    method: "POST",
    url: "/refresh",
    schema: RefreshTokenSchema,
    onRequest: [app.adminauthenticate],
    handler: refreshTokenHandlerAdmin,
  });

  done();
}

export default AuthRoutes;
