export * from './insert';
import { kyselyDate } from '../dateUtils';
// import { kyselyConditionUtils } from './conditions';
import { KInsert, KyselyInsert } from './insert';

import { KyselySelectJson } from './select';

export const kyselyUtils = {
  // ...kyselyConditionUtils,
  date: kyselyDate,
  ins: KInsert,
  KyselyInsert,
  KyselySelectJson,
};
