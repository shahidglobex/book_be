import type { FastifyReply, FastifyRequest } from 'fastify';
import { appConfig } from '../config';
import { AppErrors } from '../lib/errors';
import { AppError } from '../utils';

async function serverDecorator(req: FastifyRequest, reply: FastifyReply) {
  const tokenHeader = req.headers[appConfig.SERVER_AUTH_TOKEN_HEADER];

  if (!tokenHeader || typeof tokenHeader !== 'string') {
    return reply.send(new AppError(AppErrors.ForbiddenError));
  }
}

export default serverDecorator;
