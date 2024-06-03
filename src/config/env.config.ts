import envSchema from "env-schema";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const schema = z.object({
  // App - Init
  PORT: z.number().default(4050).optional(),
  HOST: z.string().default("0.0.0.0").optional(),

  //Database
  DB_HOST: z.string().default("localhost"),
  DB_USER: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_PASSWORD: z.string(),
  DB_PORT: z.number().default(3306),
  // DATABASE_URL: z.string(),

  NODE_ENV: z.string().default("development"),
  MAX_POOL_CONNECTIONS: z.number().default(10),
  DEFAULT_PAGESIZE: z.number().default(15),
  MAX_PAGESIZE: z.number().default(100),

  AUTH_TOKEN_VALIDITY: z.string().default("15"), // Default 15
  AUTH_REFRESH_TOKEN_VALIDITY: z.string().default("30"), // Default 30

  // HEADERS
  AUTH_TOKEN_HEADER: z.string().default("authorization"),
  API_PUBLIC_KEY_HEADER: z.string().default("public-key"),
  API_REQUEST_HASH_HEADER: z.string().default("payload-hash"),

  DEFAULT_USERNAME: z.string().default("GatewayBridgeAdmin2024"),
  DEFAULT_PASSWORD: z.string(),

  ALPHA_NUMERIC_FORMAT: z
    .string()
    .default("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"),

  API_BASE_URL: z.string().default("https://backv2.tradex.live"),

  VALIDATE_IFSC_RAZOR_PAY_URL: z.string().default("https://ifsc.razorpay.com/"),
});

type Env = z.infer<typeof schema>;

function validateEnvs(schemaToValidate: any) {
  try {
    return envSchema<Env>({
      schema: schemaToValidate,
      dotenv: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in Env Config >>> \n", error.name, error.message);
    }
    process.exit(1);
  }
}

export const envConfig = validateEnvs(zodToJsonSchema(schema));
