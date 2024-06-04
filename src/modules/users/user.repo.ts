import { v4 as uuid } from "uuid";
import { RolesConst } from "../../constants";

import { kysely } from "../../providers/db";

import { KyselyInsert } from "../../utils/kysely";
import {
  T_AdminIn,
  T_CreateAdminBook,
  T_GetManyAdminQuery,
  T_GetOneAdminParams,
  T_UpdateAdmin,
  T_UpdateAdminBook,
} from "./schemas/types";
import { paginationResolver } from "../../utils/queryUtil";
import { RequestUser } from "../auth/types";

async function updateUserBook(payload: T_UpdateAdminBook) {
  await kysely
    .updateTable("user_books")
    .set({
      Book: JSON.stringify(payload.Book),
    })
    .where("id", "=", payload.id)
    .execute();
}

async function getUserBook(user_id: number) {
  return await kysely
    .selectFrom("user_books")
    .selectAll()
    .where("user_books.user_id", "=", user_id)
    .orderBy("id desc")
    .executeTakeFirst();
}
const UserRepo = {
  getUserBook,
  updateUserBook,
};

export default UserRepo;
