import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import AuthRoutes from "../modules/auth/auth.router";

import adminRoutes from "../modules/admins/admin.route";
import userRoutes from "../modules/users/user.route";
function AppRoutes(
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (error?: FastifyError) => void
) {
  app.register(adminRoutes, { prefix: "admin" });
  app.register(AuthRoutes, { prefix: "auth" });
  app.register(userRoutes, { prefix: "user" });

  // app.get("/websocket", { websocket: true }, (connection, req) => {
  //   console.log("socket conneecteddd::::");
  //   connection.on("message", (message) => {
  //     // Handle incoming messages from aclient
  //     console.log("Received message from client:", message.toString());
  //     const parsedJson = JSON.parse(message.toString());
  //     if (parsedJson["event"] === "adminChangedData") {
  //       console.log("Dasdas");
  //       connection.send(JSON.stringify({ type: "fetchAdmin" }));
  //     }
  //     connection.send(JSON.stringify({ type: "fetchAdmin" }));
  //   });

  //   // Send a message to the client
  //   connection.send("Hello from the server!");
  // });
  app.get("/healthcheck", (req, reply) => {
    return reply.send({ status: "ok", stack: "yes" });
  });

  done();
}

export default AppRoutes;
