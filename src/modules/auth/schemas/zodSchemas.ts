import { z } from "zod";

const UserCorePartial = {
  name: z.string(),
  email: z.string().email().optional(),
  role: z.string().optional(),
};
const UserIdCorePartial = { userId: z.string() };

export const UserCore = z.object({
  ...UserIdCorePartial,
  ...UserCorePartial,
});

// Sign In
export const SignInBody = z.object({
  userName: z.string(),
  password: z.string(),
});

export const SignInResponseBody = z.object({
  ...UserCorePartial,
  accessToken: z.string().nullable(),
  expires: z.string().nullable(),
  refreshToken: z.string().nullable(),
});

// Sign Out

// Refresh
export const RefreshTokenBody = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const RefreshTokenResponse = z.object({
  accessToken: z.string(),
  expires: z.string(),
  refreshToken: z.string(),
});
