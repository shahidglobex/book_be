import { FastifyReply, FastifyRequest } from "fastify";
import {
  T_CreateAdmin,
  T_CreateAdminBook,
  T_GetManyAdminQuery,
  T_UpdateAdmin,
  T_UpdateAdminBook,
} from "./schemas/types";
import {
  createAdminBookService,
  createAdminService,
  getAdminBookService,
  getManyAdminService,
  getUserAllBooks,
  getUserById,
  updateAdminBookService,
  updateAdminService,
} from "./admin.service";
// import { WebSocket } from "ws";

export const createAdminHandler = async (
  req: FastifyRequest<{ Body: T_CreateAdmin }>
) => {
  return await createAdminService({
    payload: req.body,
    user: req.user,
  });
};

export const createAdminBookHandler = async (
  req: FastifyRequest<{ Body: T_CreateAdminBook }>
) => {
  return await createAdminBookService({
    payload: req.body,
  });
};

export const getAdminBookHandler = async (
  req: FastifyRequest<{}>,
  reply: FastifyReply
) => {
  const books = await getAdminBookService();

  return reply.send({
    id: books?.id,
    TeamA: books?.TeamA,
    TeamB: books?.TeamB,
    Book: books?.Book,
    is_active: books?.is_active ? true : false,
    winner: books?.winner || "",
    created_at: books?.created_at,
  });
};

export const updateAdminBookHandler = async (
  req: FastifyRequest<{ Body: T_UpdateAdminBook }>
) => {
  req.server.io.emit("updateAdminBook");
  return await updateAdminBookService({
    payload: req.body,
  });
};

export const getManyAdminHandler = async (
  req: FastifyRequest<{ Querystring: T_GetManyAdminQuery }>
) => {
  return await getManyAdminService({
    query: req.query,
    user: req.user,
  });
};

export const getUserBooksHandler = async (
  req: FastifyRequest<{ Querystring: { id: number } }>,
  reply: FastifyReply
) => {
  const books = await getUserAllBooks({ userId: req.query.id });
  const user = await getUserById({ userId: req.query.id });
  return reply.send({ books, user });
};

export const updateAdminHandler = async (
  req: FastifyRequest<{ Body: T_UpdateAdmin }>
) => {
  return await updateAdminService({
    payload: req.body,
    user: req.user,
  });
};
