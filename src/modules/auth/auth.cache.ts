import { REDIS_KEYS } from '../../constants';
import { cacheHelper } from '../../providers/db';

export const arkTokenCache = cacheHelper<{ token: string; expiry: number }>({
  redisKey: REDIS_KEYS.ARK.AUTH,
});
