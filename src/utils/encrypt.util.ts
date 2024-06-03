import { appConfig } from "../config";
import CryptoJS from "crypto-js";

export function symmetricEncrypt(data: string) {
  return CryptoJS.AES.encrypt(data, appConfig.MASTER_ENCRYPTION_KEY).toString();
}

export function symmetricEncryptSecondary(data: string) {
  return CryptoJS.AES.encrypt(
    data,
    appConfig.SECONDARY_ENCRYPTION_KEY
  ).toString();
}

export function symmetricDecrypt(data: string) {
  return CryptoJS.AES.decrypt(data, appConfig.MASTER_ENCRYPTION_KEY).toString(
    CryptoJS.enc.Utf8
  );
}

export function symmetricSecondaryDecrypt(data: string) {
  return CryptoJS.AES.decrypt(
    data,
    appConfig.SECONDARY_ENCRYPTION_KEY
  ).toString(CryptoJS.enc.Utf8);
}
