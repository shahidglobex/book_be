import { z, ZodType, ZodTypeDef } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export const MakeResponseSchema = (
  schema: ZodType<any, ZodTypeDef, any>,
  name?: undefined,
) => {
  const wrapper = z.object({
    statusCode: z.number().optional(),
    error: z.null().default(null),
    data: schema,
  });
  return zodToJsonSchema(wrapper, name);
};
