import crypto from "crypto";

// Function to generate a unique private key
export const generatePrivateKey = () => {
  const privateKey = crypto.randomBytes(32).toString("hex");
  const timestamp = Date.now();
  return `${privateKey}_${timestamp}`;
};

// Function to derive public key from private key
export const generatePublicKey = (privateKey: string) => {
  const publicKey = crypto.randomBytes(32).toString("hex");
  const timestamp = Date.now();
  return `${publicKey}_${timestamp}`;
};
