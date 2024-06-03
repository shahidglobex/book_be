export const ACTIVITY_MODULES = {
  Auth: "auth",
  User: "user",
  UserPassword: "user_password",
  UserArkDetails: "user_arkdetails",
  Admin: "admin",
  AdminPassword: "admin_password",
  AdminIPWhitelist: "admin_ip_whitelist",
  Deposit: "deposit",
  Withdraw: "withdraw",
  CompanyBank: "company_bank",
  UserBank: "user_bank",
  PaymentGateway: "payment_gateway",
} as const;

export const ACTIVITY_ACTIONS = {
  Update: "update",
  Create: "create",
  Delete: "delete",
  Login: "login",
  Logout: "logout",
} as const;
