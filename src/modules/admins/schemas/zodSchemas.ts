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
  role: z.string().optional(),
  createdAt: z.date().optional(),
});

export const ZS_GetManyAdminRes = z.object({
  count: z.number(),
  pagesize: z.number(),
  results: z.array(ZS_GetOneAdminRes),
});

export const ZS_CreateAdminBook = z.object({
  id: z.number().optional(),
  TeamA: z.string().optional(),
  TeamB: z.string().optional(),
  Book: z
    .object({
      teamA: z.array(z.number()),
      teamB: z.array(z.number()),
    })
    .optional(),

  winner: z.string().optional(),
  is_active: z.boolean().optional(),
});

export const ZS_GetUsersWithBook = z.object({
  name: z.string(),
  book: ZS_CreateAdminBook,
});

export const ZS_UpdateAdminBook = z.object({
  id: z.number(),
  book: z
    .object({
      teamA: z.array(z.number()),
      teamB: z.array(z.number()),
    })
    .optional(),
  winner: z.string().optional(),
});

export const ZS_CreateUserBook = z.object({
  book: z.object({
    teamA: z.array(z.number()),
    teamB: z.array(z.number()),
    times: z.number(),
  }),
});

export const ZS_GetUsersWithAllBook = z.object({
  user: ZS_GetOneAdminRes,
  books: ZS_CreateAdminBook.array(),
});
