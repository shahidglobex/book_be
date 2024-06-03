import zodToJsonSchema from 'zod-to-json-schema';
import { MakeResponseSchema } from '../../../utils';
import {
  RefreshTokenBody,
  RefreshTokenResponse,
  SignInBody,
  SignInResponseBody,
} from './zodSchemas';

export const SignInSchema = {
  tags: ['Auth'],
  description: 'Sign In',
  body: zodToJsonSchema(SignInBody),
  response: {
    200: MakeResponseSchema(SignInResponseBody),
  },
};

export const RefreshTokenSchema = {
  tags: ['Auth'],
  description: 'Refresh',
  body: zodToJsonSchema(RefreshTokenBody),
  response: {
    200: MakeResponseSchema(RefreshTokenResponse),
  },
};
