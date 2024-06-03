import { appConfig } from "../config";

export const ExpiryGenerator = (validFor?: string): string => {
  if (validFor) {
    return (Date.now() + parseInt(validFor) * 60000).toString();
  }
  return (Date.now() + 15 * 60000).toString();
};
