import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { AppErrors } from '../lib/errors';
import { AppError } from '../utils';
import { requestIPValidator } from '../utils/ValidatorIP';

function ipValidatorDecorator(ips: string[], label?: string) {
  return function (req: FastifyRequest, reply: FastifyReply, done: (err?: FastifyError) => void) {
    const validateIP = requestIPValidator({
      whiteList: ips,
      req,
      unsafe: true,
    });

    if (!validateIP.passed) {
      // Invalid ip
      console.log(label ? `IPvalidatorError::${label}::Denied` : 'IPvalidatorError::Denied ' + validateIP.ip);

      throw new AppError(AppErrors?.ForbiddenError, 'Access to this resource is Forbidden');
    }
    // IP is ok, so go on
    // console.log('IP ok');
    done();
  };
}

export type T_ipValidatorDecorator = typeof ipValidatorDecorator;

export default ipValidatorDecorator;

// async function ipValidatorDecorator(req: FastifyRequest, reply: FastifyReply) {
//   const validateIP = requestIPValidator({
//     whiteList: appConfig.IP_WHITE_LIST,
//     req,
//     unsafe: true,
//   });

//   if (!validateIP.passed) {
//     // Check privateIPS
//     const privateValidateIP = requestIPValidator({
//       whiteList: appConfig.PRIVATE_IP_WHITE_LIST,
//       req,
//       unsafe: true,
//       isPrivateIPs: true,
//     });

//     if (!privateValidateIP.passed) {
//       console.log('Denied ' + validateIP.ip);

//       throw new AppError(
//         AppErrors?.AccessDenied,
//         'Access to this resource is Forbidden',
//       );
//     }
//     // Invalid ip
//   }
//   // IP is ok, so go on
//   // console.log('IP ok');
// }

// export default ipValidatorDecorator;
