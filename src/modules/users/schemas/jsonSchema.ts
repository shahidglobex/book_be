import zodToJsonSchema from "zod-to-json-schema";
import { MakeResponseSchema } from "../../../utils";
import {
  ZS_CreateAdmin,
  ZS_CreateAdminBook,
  ZS_GetManyAdminQuery,
  ZS_GetManyAdminRes,
  ZS_GetOneAdminParams,
  ZS_GetOneAdminRes,
  ZS_GetUserBook,
  ZS_GetUsersWithBook,
  ZS_UpdateAdmin,
  ZS_UpdateAdminBook,
  ZS_UpdateAdminTRes,
  ZS_UpdateUserBook,
} from "./zodSchemas";

export const UpdateUserBookSchema = {
  tags: ["Admin"],
  description: "Update User book",
  body: zodToJsonSchema(ZS_UpdateUserBook),
  response: {
    200: MakeResponseSchema(ZS_UpdateAdminTRes),
  },
};

export const GetUserBookSchema = {
  tags: ["Book"],
  description: "Get admin book",
  params: zodToJsonSchema(ZS_GetOneAdminParams),
  response: {
    200: MakeResponseSchema(ZS_GetUserBook),
  },
};
