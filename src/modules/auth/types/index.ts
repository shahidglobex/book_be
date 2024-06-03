import { z } from "zod";
import {
  RefreshTokenBody,
  RefreshTokenResponse,
  SignInBody,
  SignInResponseBody,
  UserCore,
} from "../schemas/zodSchemas";

export type RequestUser = {
  id: number;
  name: string;
  role: string[];
  phone?: string;
  email?: string | null;
  ip: string;
  userAgent: string;
};

export type RequestWebsite = {
  id: number;
  domain: string;
  is_enabled: number;
  callback_url: string;
  redirect_url: string;
  public_key: string;
  private_key: string;
};

export type TokenResponseRepoType = {
  token: string | null;
  token_expires: string | null;
  rfrsh_token: string | null;
  rfrsh_token_expires: string | null;
};

export type SignInBodyType = z.infer<typeof SignInBody>;

export type SignInResponseBodyType = z.infer<typeof SignInResponseBody>;

export type RefreshTokenBodyType = z.infer<typeof RefreshTokenBody>;

export type RefreshTokenResponseType = z.infer<typeof RefreshTokenResponse>;

export type UserCore = z.infer<typeof UserCore>;

export type T_TradexAdminInfo = {
  name: string;
  email: string;
  phone: string;
  status: string;
};

export type T_TradexPlayerInfo = {
  statusCode: number;
  data: {
    name: string;
    phone: string;
    email: string;
    arkUserId: string;
    arkUserName: string;
    arkAccountId: string;
    status: string;
    isDemo?: boolean;
  };
};

export type T_PlayerIn = T_TradexPlayerInfo & {
  password: string;
  registrationType: String;
  parentId: number;
};

export type T_ArkUserRegisterResponse = {
  data: {
    userId: number;
    firstName: string;
    username: string;
    userType: number;
    accountId: number;
    allowMultiSession: boolean;
    whiteLabel: boolean;
    parentId: number;
    currencyPolicyId: number;
    genericPolicyId: number;
    demo: boolean;
    locked: boolean;
    closeOnly: boolean;
    openOnly: boolean;
    ignoreLiquidation: boolean;
    percentageLevel1: number;
    percentageLevel2: number;
    percentageLevel3: number;
    percentageLevel4: number;
    clientPriceExecution: boolean;
    creditLoanPercentage: number;
    enableCashDelivery: boolean;
    enableDepositRequest: boolean;
    userCurrencyId: number;
    canTransferPosition: boolean;
    canTransferMoney: boolean;
    blockFrequentTradesSeconds: number;
    emailVerified: boolean;
  };
  message: "User Created Successfully";
  httpStatus: number;
  timestamp: number;
  success: boolean;
};

export type T_VerificationIn = {
  phone: string;
  type: string;
  otp: string;
  ip: string | null;
};

export type T_ArkUserDetails = {
  data: {
    firstName: string;
    accountId: number;
    mobile: string;
    country: string;
    username: string;
    password: string;
    address: string;
    tradingType: number;
    locked: boolean;
    closeOnly: boolean;
    openOnly: boolean;
    ignoreLiquidation: boolean;
    forceChangePW: boolean;
    allowMultiSession: boolean;
    demo: boolean;
    currenciesPolicyId: number;
    genericPolicyId: number;
    whiteLabel: boolean;
    maxUser: number;
    blockFrequentTradesSeconds: number;
    id: number;
    validateMoneyBeforeEntry: boolean;
    validateMoneyBeforeClose: boolean;
    noSellAtLoss: boolean;
    clientPriceExecution: boolean;
    percentageLevel1: number;
    percentageLevel2: number;
    percentageLevel3: number;
    percentageLevel4: number;
    canTransferMoney: boolean;
    accountMirroringAccountIds: [];
    creditLoanPercentage: number;
    enableCashDelivery: boolean;
    enableDepositRequest: boolean;
    userCurrencyId: number;
    canTransferPosition: boolean;
    canCreateOrUpdateEntryOrder: boolean;
    ignoreBlockTradeIfInLoss: boolean;
    twoFactorAuthenticationEnabled: boolean;
    createdDate: string;
    isVerified: boolean;
    accountType: number;
    userWhiteListIps: [];
  };
  message: string;
  httpStatus: number;
  timestamp: number;
  success: boolean;
};
