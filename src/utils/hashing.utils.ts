import CryptoJS from 'crypto-js';

export function generateHmacSHA256(data: any, key: string) {
  const hash = CryptoJS.HmacSHA256(data.split(' ').join(''), key);
  return CryptoJS.enc.Base64.stringify(hash);
}

export function generateSHA256(message: string) {
  const hash = CryptoJS.SHA256(message);
  return CryptoJS.enc.Hex.stringify(hash);
}
