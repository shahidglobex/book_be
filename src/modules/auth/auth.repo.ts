import { nanoid } from "nanoid";
import { appConfig } from "../../config";
import { ExpiryGenerator } from "../../utils";
import { RefreshTokenBodyType } from "./types";
import { kysely } from "../../providers/db/kysely.db";
import { prisma } from "../../providers/db/prisma.db";
import argon2 from "argon2";
import { RolesConst } from "../../constants";

export const updateAdminToken = async ({
  adminId,
  invalidate,
}: {
  adminId: number;
  invalidate?: boolean;
}) => {
  const token = invalidate ? null : nanoid();

  const token_expires = invalidate
    ? null
    : ExpiryGenerator(appConfig.AUTH_TOKEN_VALIDITY);
  const rfrsh_token = invalidate ? null : nanoid();
  const rfrsh_token_expires = invalidate
    ? null
    : ExpiryGenerator(appConfig.AUTH_REFRESH_TOKEN_VALIDITY);

  return await prisma.session.upsert({
    where: {
      user_id: adminId,
    },
    update: {
      token,
      token_expires,
      rfrsh_token,
      rfrsh_token_expires,
    },
    create: {
      user_id: adminId,
      token,
      token_expires,
      rfrsh_token,
      rfrsh_token_expires,
    },
    select: {
      token: true,
      token_expires: true,
      rfrsh_token: true,
      rfrsh_token_expires: true,
    },
  });
};

export const getByTokens = async ({
  accessToken,
  refreshToken,
}: RefreshTokenBodyType) => {
  return await prisma.session.findFirst({
    where: { AND: [{ token: accessToken }, { rfrsh_token: refreshToken }] },
    select: {
      user_id: true,
    },
  });
};

async function getAdminByUserNameOrEmail(emailOrName: string) {
  return await kysely
    .selectFrom("admins")
    .innerJoin("roles", "roles.id", "admins.role_id")
    .select([
      "admins.id as id",
      "password",
      "user_name",
      "email",
      "roles.name as role",
    ])
    .where((qb) =>
      qb.or([qb("email", "=", emailOrName), qb("user_name", "=", emailOrName)])
    )
    .executeTakeFirst();
}

export async function getByToken(input: {
  token: string;
  reqIP: string;
  userAgent: string;
}) {
  const session = await kysely
    .selectFrom("session")
    .innerJoin("admins", "admins.id", "session.user_id")
    .innerJoin("roles", "roles.id", "admins.role_id")
    .select([
      "session.token",
      "session.token_expires",
      "session.ip",
      "session.user_id",
      "admins.id as adminId",
      "admins.user_name as userName",
      "admins.email as email",
      "roles.id as roleId",
      "roles.name as roleName",
      "roles.level as roleLevel",
    ])
    .where("session.token", "=", input.token)
    .executeTakeFirst();

  if (session?.ip !== input.reqIP) {
    await kysely
      .updateTable("session")
      .set({ ip: input.reqIP, user_agent: input.userAgent })
      .where("token", "=", input.token)
      .execute();
  }

  return session;
}

const seedSuperAdmin = async () => {
  const role = await prisma.roles.findFirst({
    where: {
      name: RolesConst.SuperAdmin,
    },
    select: {
      id: true,
    },
  });
  if (role && role.id) {
    await prisma.admins.upsert({
      where: { user_name: appConfig.DEFAULT_USERNAME },
      update: {
        user_name: appConfig.DEFAULT_USERNAME,
        email: appConfig.DEFAULT_USERNAME,
        password: await argon2.hash(appConfig.DEFAULT_PASSWORD),
      },
      create: {
        user_name: appConfig.DEFAULT_USERNAME,
        email: appConfig.DEFAULT_USERNAME,
        password: await argon2.hash(appConfig.DEFAULT_PASSWORD),
        role_id: role.id,
      },
      select: {
        email: true,
      },
    });
  }
};

const AuthRepo = {
  getByToken,
  updateAdminToken,
  getByTokens,
  getAdminByUserNameOrEmail,
  seedSuperAdmin,
};

export default AuthRepo;
