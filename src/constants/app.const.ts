export enum OrderByConst {
  Asc = "asc",
  Desc = "desc",
}
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,25}$/
);
export enum UserStatusConst {
  Active = "active",
  Blocked = "blocked",
  Suspended = "suspended",
}

export const UserRegistrationType = Object.freeze({
  Migrated: "migrated",
  Created: "created",
});

export enum TXN_TYPE_FULL {
  Deposit = "deposit",
  Withdraw = "withdraw",
}
export enum RolesConst {
  SuperAdmin = "superadmin",
  Admin = "admin",
  Agent = "agent",
}
export const DEFAULT_ROLES = [
  { name: RolesConst.SuperAdmin, level: 0, label: "Super Admin" },
  { name: RolesConst.Admin, level: 1, label: "Admin" },
  { name: RolesConst.Agent, level: 3, label: "Agent" },
];

export const PaymentGatewaysConst = Object.freeze({
  HPAY: "hpay",
  CHEEZEE: "cheezeepay",
  GAMINGPE: "gamingpe",
  PAYZEASY: "payzeasy",
});

export const PaymentGatewaysStatusConst = Object.freeze({
  success: "success",
  pending: "pending",
  failed: "failed",
});

export const GatewayStatusConst = Object.freeze({
  Pending: "pending",
  Processing: "processing",
  Approved: "approved",
  Rejected: "rejected",
  Canceled: "canceled",
  Success: "success",
  Failed: "failed",
  Expired: "expired",
  Declined: "declined",
});
