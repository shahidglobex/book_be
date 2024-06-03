import type { FastifyReply, FastifyRequest } from "fastify";
import { appConfig } from "../config";
import { AppErrors } from "../lib/errors";
import { AppError } from "../utils";
import AuthRepo from "../modules/auth/auth.repo";

import { getClientIpUnSafe, getUserAgent } from "../utils/ValidatorIP";

async function adminAuthDecorator(req: FastifyRequest, reply: FastifyReply) {
  const tokenHeader = req.headers[appConfig.AUTH_TOKEN_HEADER];

  const reqIP = getClientIpUnSafe(req)?.clean || "";
  const userAgent = getUserAgent(req) || "";

  if (
    !tokenHeader ||
    typeof tokenHeader !== "string" ||
    !tokenHeader.split(" ")[1]
  ) {
    return reply.send(new AppError(AppErrors.InvalidHeaders));
  }

  const session = await AuthRepo.getByToken({
    token: tokenHeader.split(" ")[1],
    reqIP,
    userAgent,
  });

  if (!session) {
    return reply.send(new AppError(AppErrors.InvalidToken));
  }

  if (!session.user_id) {
    return reply.send(new AppError(AppErrors.InvalidToken));
  }

  // Check if token is Expired
  if (parseInt(session.token_expires || "0") < Date.now()) {
    return reply.send(new AppError(AppErrors.tokenExpired));
  }

  req.user = {
    id: Number(session.user_id),
    name: session.userName,
    email: session.email,
    role: [session.roleName],
    ip: reqIP,
    userAgent: userAgent,
  };
}

export default adminAuthDecorator;
