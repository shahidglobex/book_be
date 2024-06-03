import type {
  FastifyError,
  FastifyInstance,
  FastifyPluginOptions,
} from "fastify";
import { getUserBookHandler, updateUserBookHandler } from "./user.controller";
import { GetUserBookSchema, UpdateUserBookSchema } from "./schemas/jsonSchema";
import { RolesConst } from "../../constants";
import { updateUserBookService } from "./user.service";

function userRoutes(
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (error?: FastifyError) => void
) {
  app.addHook("onRequest", app.adminauthenticate);

  app.route({
    method: "PATCH",
    url: "/update-book",
    preHandler: app.guard.role(
      RolesConst.Agent,
      RolesConst.SuperAdmin,
      RolesConst.Admin
    ),
    schema: UpdateUserBookSchema,
    handler: updateUserBookHandler,
  });

  app.route({
    method: "GET",
    url: "/book",
    preHandler: app.guard.role(
      RolesConst.Agent,
      RolesConst.SuperAdmin,
      RolesConst.Admin
    ),
    schema: GetUserBookSchema,
    handler: getUserBookHandler,
  });

  done();
}

export default userRoutes;
