import argon2 from "argon2";
import AdminRepo from "./admin.repo";
import { UserRegistrationType } from "../../constants";
import { RequestUser } from "../auth/types";
import {
  T_CreateAdmin,
  T_CreateAdminBook,
  T_GetManyAdminQuery,
  T_GetManyAdminRes,
  T_GetOneAdminParams,
  T_GetOneAdminRes,
  T_UpdateAdmin,
  T_UpdateAdminBook,
  T_UpdateAdminTRes,
} from "./schemas/types";
import { AppError } from "../../utils";
import { AppErrors } from "../../lib/errors";
import AuthRepo from "../auth/auth.repo";
import { ACTIVITY_ACTIONS, ACTIVITY_MODULES } from "../../constants";
import { isSuperAdmin } from "../../utils/isValidators";

export const createAdminService = async (input: {
  user: RequestUser;
  payload: T_CreateAdmin;
}): Promise<T_UpdateAdminTRes> => {
  const hash = await argon2.hash(input.payload.password);

  const result = await AdminRepo.create({
    ...input.payload,
    parentId: input.user.id,
    password: hash,
    registrationType: UserRegistrationType.Created,
  });

  return { message: "Created successfully" };
};

export const createAdminBookService = async (input: {
  payload: T_CreateAdminBook;
}): Promise<T_UpdateAdminTRes> => {
  const result = await AdminRepo.createAdminBook(input.payload);

  return { message: "Created successfully" };
};

export const updateAdminBookService = async (input: {
  payload: T_UpdateAdminBook;
}): Promise<T_UpdateAdminTRes> => {
  const result = await AdminRepo.updateAdminBook(input.payload);

  return { message: "Created successfully" };
};

export const getAdminBookService = async () => {
  return await AdminRepo.getAdminBook();
};

export const getManyAdminService = async (input: {
  user: RequestUser;
  query: T_GetManyAdminQuery;
}): Promise<T_GetManyAdminRes> => {
  const { count, pagesize, results } = await AdminRepo.getMany(input.query);
  return {
    count,
    pagesize,
    results,
  };
};

export const getUserAllBooks = async (input: { userId: number }) => {
  return await AdminRepo.getUserAllBooks(input.userId);
};

export const getUserById = async (input: { userId: number }) => {
  return await AdminRepo.getUserById(input.userId);
};
