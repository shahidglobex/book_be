import { FastifyReply, FastifyRequest } from "fastify";
import { T_UpdateAdminBook } from "./schemas/types";
import { getUserBookService, updateUserBookService } from "./user.service";

export const updateUserBookHandler = async (
  req: FastifyRequest<{ Body: T_UpdateAdminBook }>
) => {
  req.server.io.emit("updateUserBook");
  return await updateUserBookService({
    payload: req.body,
  });
};

export const getUserBookHandler = async (
  req: FastifyRequest<{}>,
  reply: FastifyReply
) => {
  const userBook = await getUserBookService(req.user.id);
  return reply.send({
    ...userBook,
    Book: userBook?.Book,
  });
};
