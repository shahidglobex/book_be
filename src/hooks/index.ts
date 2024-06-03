import type {
  FastifyError,
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import fp from 'fastify-plugin';
import { appConfig } from '../config';

const AppHooks = fp(function (
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (error?: FastifyError) => void,
) {
  app.addHook(
    'preSerialization',
    async (request: FastifyRequest, reply: FastifyReply, payload: any) => {
      return !payload?.error
        ? { statusCode: reply.statusCode, error: null, data: payload }
        : payload;
    },
  );

  done();
});

export default AppHooks;
