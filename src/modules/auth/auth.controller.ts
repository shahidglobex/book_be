import type { FastifyRequest, FastifyReply } from "fastify";
import { RefreshTokenBodyType, SignInBodyType } from "./types";
import {
  refreshTokenServiceAdmin,
  signInServiceAdmin,
  signInServiceUser,
  signOutServiceAdmin,
} from "./auth.service";

export const signInHandlerAdmin = async (
  req: FastifyRequest<{ Body: SignInBodyType }>,
  reply: FastifyReply
) => {
  const user = await signInServiceAdmin(req.body);

  return reply.code(200).send(user);
};

export const signInHandlerUser = async (
  req: FastifyRequest<{ Body: SignInBodyType }>,
  reply: FastifyReply
) => {
  const user = await signInServiceUser(req.body);

  return reply.code(200).send(user);
};

export const signOutHandlerAdmin = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  await signOutServiceAdmin({
    adminId: req.user?.id,
    request: req,
  });

  return reply.code(200).send("GoodBye");
};

export const refreshTokenHandlerAdmin = async (
  req: FastifyRequest<{ Body: RefreshTokenBodyType }>,
  reply: FastifyReply
) => {
  const user = await refreshTokenServiceAdmin(req.body);

  return reply.code(200).send(user);
};
