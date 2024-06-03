import { FastifyRequest } from 'fastify';

export function ipNormalizer(ipToNomalize: string) {
  // if (ipToNomalize.substr(0, 7) == '::ffff:') {
  //   ipToNomalize = ipToNomalize.substr(7);
  // }
  return ipToNomalize.replace('::ffff:', '');
}

export function getClientIpSafe(req: FastifyRequest) {
  const ipAddress = req.socket.remoteAddress;
  if (!ipAddress) {
    return null;
  }
  // convert from "::ffff:192.0.0.1"  to "192.0.0.1"

  const resIP = ipNormalizer(ipAddress);

  if (Array.isArray(resIP)) {
    return { raw: ipAddress, clean: resIP[0].split(',')[0] as string };
  }

  return { raw: ipAddress, clean: resIP.split(',')[0] as string };
}

export function getClientIpUnSafe(req: FastifyRequest) {
  const ipAddress = req.headers['x-forwarded-for'];

  if (!ipAddress) {
    return getClientIpSafe(req);
  }

  if (Array.isArray(ipAddress)) {
    return { raw: ipAddress[0], clean: ipAddress[0].split(',')[0] as string };
  }

  return { raw: ipAddress, clean: ipAddress.split(',')[0] as string };
}

export function requestIPValidator({
  whiteList,
  req,
  unsafe,
  disableSplitIP,
  isPrivateIPs,
}: {
  whiteList: string[];
  req: FastifyRequest;
  unsafe: boolean;
  disableSplitIP?: boolean;
  isPrivateIPs?: boolean;
}) {
  const ipRes = !unsafe ? getClientIpSafe(req) : getClientIpUnSafe(req);

  if (!ipRes) {
    return { passed: false, ip: ipRes };
  }

  const finalIP = disableSplitIP ? ipRes.raw : ipRes.clean;

  // console.log({
  //   whiteList,
  //   finalIP,
  //   ipRes,
  //   getClientIpSafe: getClientIpSafe(req),
  //   getClientIpUnSafe: getClientIpUnSafe(req),
  // });

  if (!isPrivateIPs && !whiteList.includes(finalIP)) {
    return { passed: false, ip: ipRes };
  }

  const privateIPtoTest = finalIP;

  if (isPrivateIPs && !whiteList.find((x) => privateIPtoTest.startsWith(x))) {
    return { passed: false, ip: ipRes };
  }

  return { passed: true, ip: ipRes };
}

export const getUserAgent = (req: FastifyRequest) => {
  return req.headers['user-agent'];
};
