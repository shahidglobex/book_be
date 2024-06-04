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

async function create(input: T_AdminIn & { parentId: number }) {
  const user = await KyselyInsert(kysely, {
    table: "admins",
    values: {
      user_name: input.user_name,
      password: input.password,
      email: input.email.trim(),
      role_id: 1,
      created_at: new Date(),
    },
  }).executeTakeFirst();

  return user;
}

async function getMany(query: T_GetManyAdminQuery) {
  const pagination = paginationResolver(query, {
    orderByMap: { date: "admins.created_at" },
  });

  const kQuery = kysely
    .selectFrom("admins")
    .innerJoin("roles", "roles.id", "admins.role_id")
    .where("roles.name", "<>", RolesConst.SuperAdmin)
    .$if(Boolean(query.q), (qb) =>
      qb.where((eb) =>
        eb.or([
          eb("admins.email", "like", `%${query.q}%`),
          eb("admins.user_name", "like", `%${query.q}%`),
        ])
      )
    );

  const count = await kQuery
    .select((eb) => eb.fn.count<number>("admins.id").as("count"))
    .executeTakeFirst();

  const results = await kQuery
    .select([
      "admins.id as id",
      "roles.name as role",
      "admins.user_name",
      "admins.email",
      "admins.created_at as createdAt",
    ])
    .limit(pagination.limit)
    .offset(pagination.offset)
    .orderBy(pagination.orderBy.key, pagination.orderBy.direction)
    .execute();

  return {
    count: count?.count || 0,
    pagesize: pagination.limit,
    results,
  };
}

async function createAdminBook(payload: T_CreateAdminBook) {
  const adminBook = await kysely
    .insertInto("admin_books")
    .values({
      TeamA: payload.TeamA || "",
      TeamB: payload.TeamB || "",
      Book: JSON.stringify({
        teamA: [0, 0, 0],
        teamB: [0, 0, 0],
      }),
    })
    .execute();
  const users = await kysely
    .selectFrom("admins")
    .where("role_id", "!=", 1)
    .select("admins.id")
    .execute();
  const userBooks = users.map((user) => {
    return {
      user_id: user.id,
      Book: JSON.stringify({
        teamA: [0, 0, 0],
        teamB: [0, 0, 0],
      }),
      TeamA: payload.TeamA || "",
      TeamB: payload.TeamB || "",
    };
  });

  if (userBooks.length) {
    await kysely.insertInto("user_books").values(userBooks).execute();
  }
}

async function updateAdminBook(payload: T_UpdateAdminBook) {
  return await kysely
    .updateTable("admin_books")
    .set({
      ...(payload.book && { Book: JSON.stringify(payload.book) }),
      ...(payload.winner && { winner: payload.winner, is_active: 0 }),
    })
    .where("id", "=", payload.id)
    .execute();
}

async function getAdminBook() {
  return await kysely
    .selectFrom("admin_books")
    .selectAll()
    .orderBy("id desc")
    .executeTakeFirst();
}

async function getUserAllBooks(user_id: number) {
  return await kysely
    .selectFrom("user_books")
    .selectAll()
    .where("user_id", "=", user_id)
    .orderBy("id desc")
    .execute();
}

async function getUserById(user_id: number) {
  return await kysely
    .selectFrom("admins")
    .selectAll()
    .where("id", "=", user_id)
    .executeTakeFirst();
}
const AdminRepo = {
  create,
  createAdminBook,
  getAdminBook,
  updateAdminBook,
  // update,
  getUserAllBooks,
  getMany,
  getUserById,
};

export default AdminRepo;
