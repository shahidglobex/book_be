import argon2 from "argon2";
import UserRepo from "./user.repo";
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

export const updateUserBookService = async (input: {
  payload: T_UpdateAdminBook;
}): Promise<T_UpdateAdminTRes> => {
  const result = await UserRepo.updateUserBook(input.payload);

  return { message: "Created successfully" };
};

export const getUserBookService = async (user_id: number) => {
  return await UserRepo.getUserBook(2);
};
