import argon2 from "argon2";
import { AppError } from "../../utils";
import AuthRepo from "./auth.repo";
import {
  RefreshTokenBodyType,
  SignInBodyType,
  SignInResponseBodyType,
  TokenResponseRepoType,
  UserCore,
} from "./types";
import { AppErrors } from "../../lib/errors";

import { FastifyRequest } from "fastify";
import { RolesConst } from "../../constants";

export async function signInServiceAdmin(
  input: SignInBodyType
): Promise<SignInResponseBodyType> {
  const admin = await AuthRepo.getAdminByUserNameOrEmail(input.userName);

  return await performAdminLogin({
    userName: input.userName,
    inputPassword: input.password,
  });
}

export async function signInServiceUser(
  input: SignInBodyType
): Promise<SignInResponseBodyType> {
  const user = await AuthRepo.getAdminByUserNameOrEmail(input.userName);
  if (!user || user.role !== RolesConst.Agent) {
    throw new AppError(AppErrors.InvalidAuthCredentials);
  }
  return await performAdminLogin({
    userName: input.userName,
    inputPassword: input.password,
  });
}

async function performAdminLogin(input: {
  userName: string;
  inputPassword: string;
}): Promise<SignInResponseBodyType> {
  const admin = await AuthRepo.getAdminByUserNameOrEmail(input.userName);
  if (!admin) {
    throw new AppError(AppErrors.InvalidAuthCredentials);
  }

  if (!(await argon2.verify(admin.password, input.inputPassword))) {
    throw new AppError(AppErrors.InvalidAuthCredentials);
  }
  // generate new token
  const userToken = await AuthRepo.updateAdminToken({
    adminId: admin.id,
  });

  return {
    // phone: admin.mobile || "",
    name: admin.user_name,
    email: admin.email || "",
    role: admin.role,
    ...TokensMap(userToken),
  };
}

export async function signOutServiceAdmin({
  adminId,
}: {
  adminId: number;
  request: FastifyRequest;
}): Promise<UserCore | object> {
  const creds = await AuthRepo.updateAdminToken({
    adminId,
    invalidate: true,
  });

  if (!creds || creds.token != null) {
    throw new AppError(AppErrors.InternalError, "Log Out Failed");
  }

  return creds;
}

export async function refreshTokenServiceAdmin({
  accessToken,
  refreshToken,
}: RefreshTokenBodyType): Promise<UserCore | object> {
  // Validate both tokens
  const admin = await AuthRepo.getByTokens({ accessToken, refreshToken });

  if (!admin || !admin.user_id) {
    throw new AppError(AppErrors.InvalidToken);
  }

  // Refresh Tokens
  const creds = await AuthRepo.updateAdminToken({
    adminId: admin.user_id,
  });

  return TokensMap(creds);
}

function TokensMap(user: TokenResponseRepoType) {
  return {
    accessToken: user?.token,
    expires: user?.token_expires,
    refreshToken: user?.rfrsh_token,
  };
}
