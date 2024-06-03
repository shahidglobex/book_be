import { RolesConst } from "../constants";
import { RequestUser } from "../modules/auth/types";

export function isValidJson(jsonString: string) {
  try {
    const obj = JSON.parse(jsonString);

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (obj && typeof obj === "object") {
      return true;
    }
  } catch (e) {
    console.log("invalid json", e);
  }

  return false;
}
export const isSuperAdmin = (user: Pick<RequestUser, "role">): boolean =>
  Array.isArray(user.role) ? user.role[0] === RolesConst.SuperAdmin : false;
