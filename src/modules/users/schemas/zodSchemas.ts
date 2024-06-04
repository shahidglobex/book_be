import { z } from "zod";
import { appConfig } from "../../../config";
import {
  OrderByConst,
  PASSWORD_REGEX,
  RolesConst,
  UserStatusConst,
} from "../../../constants";

const AdminCore = {
  user_name: z.string(),
  email: z.string().email(),
};

export const ZS_CreateAdmin = z.object({
  ...AdminCore,
  password: z.string().min(8).max(25).regex(PASSWORD_REGEX),
  role: z.string(),
});

export const ZS_UpdateAdmin = z.object({
  id: z.number(),
  user_name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).max(25).regex(PASSWORD_REGEX).optional(),
});

export const ZS_UpdateAdminTRes = z.object({
  message: z.string(),
});

export const ZS_GetOneAdminParams = z.object({ id: z.string().optional() });

export const ZS_GetManyAdminQuery = z.object({
  q: z.string().optional(),
  pagesize: z.number().default(appConfig.DEFAULT_PAGESIZE),
  skip: z.number().default(0),
  orderby: z
    .object({
      date: z.nativeEnum(OrderByConst).optional(),
    })
    .optional(),
});

export const ZS_GetOneAdminRes = z.object({
  email: z.string(),
  user_name: z.string(),
  id: z.number(),
  role: z.string(),
  lastLogin: z.date().nullable(),
  parent: z.string().nullable(),
  createdAt: z.date(),
});

export const ZS_GetManyAdminRes = z.object({
  count: z.number(),
  pagesize: z.number(),
  results: z.array(ZS_GetOneAdminRes),
});

export const ZS_CreateAdminBook = z.object({
  TeamA: z.string(),
  TeamB: z.string(),
  Book: z.object({
    teamA: z.array(z.number()),
    teamB: z.array(z.number()),
  }),
});

export const ZS_GetUsersWithBook = z.object({
  name: z.string(),
  book: ZS_CreateAdminBook,
});

export const ZS_UpdateAdminBook = z.object({
  id: z.number(),
  Book: z.object({
    teamA: z.array(z.number()),
    teamB: z.array(z.number()),
    times: z.number().optional(),
  }),
});

export const ZS_CreateUserBook = z.object({
  Book: z.object({
    teamA: z.array(z.number()),
    teamB: z.array(z.number()),
    times: z.number(),
  }),
});

export const ZS_GetUserBook = z.object({
  id: z.number(),
  TeamA: z.string().optional(),
  TeamB: z.string().optional(),
  Book: z.object({
    teamA: z.array(z.number()),
    teamB: z.array(z.number()),
    times: z.number().optional(),
    deltaA: z.number().optional(),
    deltaB: z.number().optional(),
    amount: z.number().optional(),
    lagana: z.string().optional(),
    team: z.string().optional(),
    bhav: z.number().optional(),
  }),
});

export const ZS_UpdateUserBook = z.object({
  id: z.number(),
  Book: z.object({
    teamA: z.array(z.number()).optional(),
    teamB: z.array(z.number()).optional(),
    times: z.number().optional(),
    deltaA: z.number().optional(),
    deltaB: z.number().optional(),
    amount: z.number().optional(),
    lagana: z.string().optional(),
    team: z.string().optional(),
    bhav: z.number().optional(),
  }),
});
