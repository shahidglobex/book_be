import type { PinoLoggerOptions } from 'fastify/types/logger';
import { envConfig } from './env.config';

const envToLogger: { [key: string]: PinoLoggerOptions | boolean } = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        singleLine: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: {
    level: 'error',
    transport: {
      target: 'pino-pretty',
      options: {
        singleLine: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  test: false,
};

export const pluginConfig = Object.freeze({
  logger:
    envToLogger[(envConfig.NODE_ENV as keyof typeof envToLogger) || ''] ?? true,
});
