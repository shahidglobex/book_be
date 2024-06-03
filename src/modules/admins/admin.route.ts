import type {
  FastifyError,
  FastifyInstance,
  FastifyPluginOptions,
} from "fastify";
import {
  createAdminBookHandler,
  createAdminHandler,
  getAdminBookHandler,
  getManyAdminHandler,
  getUserBooksHandler,
  updateAdminBookHandler,
} from "./admin.controller";
import {
  CreateAdminBookSchema,
  CreateAdminSchema,
  GetAdminBookSchema,
  GetManyAdminSchema,
  GetUserWithAllBooksSchema,
  GetUsersWithBookSchema,
  UpdateAdminBookSchema,
} from "./schemas/jsonSchema";
import { RolesConst } from "../../constants";

function adminRoutes(
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (error?: FastifyError) => void
) {
  app.addHook("onRequest", app.adminauthenticate);

  app.route({
    method: "POST",
    url: "",
    preHandler: app.guard.role(RolesConst.SuperAdmin),
    schema: CreateAdminSchema,
    handler: createAdminHandler,
  });

  app.route({
    method: "GET",
    url: "",
    schema: GetManyAdminSchema,
    handler: getManyAdminHandler,
  });

  app.route({
    method: "POST",
    url: "/add-book",
    preHandler: app.guard.role(RolesConst.SuperAdmin),
    schema: CreateAdminBookSchema,
    handler: createAdminBookHandler,
  });

  app.route({
    method: "PATCH",
    url: "/update-book",
    preHandler: app.guard.role(RolesConst.SuperAdmin),
    schema: UpdateAdminBookSchema,
    handler: updateAdminBookHandler,
  });

  app.route({
    method: "GET",
    url: "/book",
    // websocket: true,
    schema: GetAdminBookSchema,
    handler: getAdminBookHandler,
    // wsHandler: (socket, req) => {
    //   // this will handle websockets connections
    //   socket.send("hello client");

    //   socket.on("message", (chunk) => {
    //     socket.close();
    //   });
    // },
  });

  app.route({
    method: "GET",
    url: "/users-book",
    schema: GetUserWithAllBooksSchema,
    handler: getUserBooksHandler,
  });

  done();
}

export default adminRoutes;
