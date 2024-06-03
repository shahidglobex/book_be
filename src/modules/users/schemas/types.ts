import type { z } from "zod";
import {
  ZS_CreateAdmin,
  ZS_CreateAdminBook,
  ZS_GetManyAdminQuery,
  ZS_GetManyAdminRes,
  ZS_GetOneAdminParams,
  ZS_GetOneAdminRes,
  ZS_UpdateAdmin,
  ZS_UpdateAdminBook,
  ZS_UpdateAdminTRes,
} from "./zodSchemas";
import { ValueOf } from "../../../types";
import { UserRegistrationType } from "../../../constants";

export type T_CreateAdmin = z.infer<typeof ZS_CreateAdmin>;
export type T_CreateAdminBook = z.infer<typeof ZS_CreateAdminBook>;
export type T_UpdateAdminBook = z.infer<typeof ZS_UpdateAdminBook>;

export type T_UpdateAdmin = z.infer<typeof ZS_UpdateAdmin>;

export type T_UpdateAdminTRes = z.infer<typeof ZS_UpdateAdminTRes>;

export type T_GetManyAdminQuery = z.infer<typeof ZS_GetManyAdminQuery>;

export type T_GetManyAdminRes = z.infer<typeof ZS_GetManyAdminRes>;

export type T_GetOneAdminParams = z.infer<typeof ZS_GetOneAdminParams>;

export type T_GetOneAdminRes = z.infer<typeof ZS_GetOneAdminRes>;

export type T_AdminIn = T_CreateAdmin & {
  registrationType: ValueOf<typeof UserRegistrationType>;
};
