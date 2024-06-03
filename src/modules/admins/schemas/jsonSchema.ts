import zodToJsonSchema from "zod-to-json-schema";
import { MakeResponseSchema } from "../../../utils";
import {
  ZS_CreateAdmin,
  ZS_CreateAdminBook,
  ZS_GetManyAdminQuery,
  ZS_GetManyAdminRes,
  ZS_GetOneAdminParams,
  ZS_GetOneAdminRes,
  ZS_GetUsersWithAllBook,
  ZS_GetUsersWithBook,
  ZS_UpdateAdmin,
  ZS_UpdateAdminBook,
  ZS_UpdateAdminTRes,
} from "./zodSchemas";

export const CreateAdminSchema = {
  tags: ["Admin"],
  description: "Create admin",
  body: zodToJsonSchema(ZS_CreateAdmin),
  response: {
    200: MakeResponseSchema(ZS_UpdateAdminTRes),
  },
};

export const CreateAdminBookSchema = {
  tags: ["Admin"],
  description: "Create admin book",
  body: zodToJsonSchema(ZS_CreateAdminBook),
  response: {
    200: MakeResponseSchema(ZS_UpdateAdminTRes),
  },
};

export const UpdateAdminBookSchema = {
  tags: ["Admin"],
  description: "Update admin book",
  body: zodToJsonSchema(ZS_UpdateAdminBook),
  response: {
    200: MakeResponseSchema(ZS_UpdateAdminTRes),
  },
};

export const GetOneAdminSchema = {
  tags: ["Admin"],
  description: "Get one admin",
  params: zodToJsonSchema(ZS_GetOneAdminParams),
  response: {
    200: MakeResponseSchema(ZS_GetOneAdminRes),
  },
};

export const GetAdminBookSchema = {
  tags: ["Book"],
  description: "Get admin book",
  params: zodToJsonSchema(ZS_GetOneAdminParams),
  response: {
    200: MakeResponseSchema(ZS_CreateAdminBook),
  },
};

export const GetUsersWithBookSchema = {
  tags: ["Book"],
  description: "Get admin book",
  params: zodToJsonSchema(ZS_GetOneAdminParams),
  response: {
    200: MakeResponseSchema(ZS_GetUsersWithBook),
  },
};

export const GetManyAdminSchema = {
  tags: ["Admin"],
  description: "Get Many admin",
  querystring: zodToJsonSchema(ZS_GetManyAdminQuery),
  response: {
    200: MakeResponseSchema(ZS_GetManyAdminRes),
  },
};

export const GetUserWithAllBooksSchema = {
  tags: ["Book"],
  description: "Get admin book",
  params: zodToJsonSchema(ZS_GetOneAdminParams),
  response: {
    200: MakeResponseSchema(ZS_GetUsersWithAllBook),
  },
};
