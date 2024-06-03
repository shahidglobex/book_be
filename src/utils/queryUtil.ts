import qs from "qs";
import { OrderByConst } from "../constants";
import { ValueOf } from "../types";
import { appConfig } from "../config";

export function filterNonNull(obj: object) {
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
}

export const QueryStringfy = (params: object) => {
  return qs.stringify(filterNonNull(params), {
    skipNulls: true,
  });
};

export const pageSizeUtil = (pageSize?: number) => {
  return !pageSize
    ? appConfig.DEFAULT_PAGESIZE
    : pageSize > appConfig.MAX_PAGESIZE
      ? appConfig.MAX_PAGESIZE
      : pageSize;
};

export const sortUtil = <
  T extends Record<string, `${OrderByConst}`>,
  KeyMap extends Record<keyof T, string>,
  DefaultOrderBy extends { key: keyof T; direction: `${OrderByConst}` },
>(
  defaults: {
    orderBy?: DefaultOrderBy;
    orderByMap: Required<KeyMap>;
  },
  sortObj?: T
) => {
  if (sortObj) {
    const orderByFinal = sortObj;
    const [key, direction] = Object.entries(orderByFinal)[0];

    return {
      key: defaults.orderByMap[key] as ValueOf<KeyMap>,
      direction,
    };
  }

  if (defaults.orderBy) {
    return {
      key: defaults.orderByMap[defaults.orderBy.key] as ValueOf<KeyMap>,
      direction: defaults.orderBy.direction,
    };
  }

  const hasKeys = Object.keys(defaults.orderByMap).length;
  const [_, key] = hasKeys
    ? Object.entries(defaults.orderByMap)[0]
    : [null, null];

  return {
    key: key as ValueOf<KeyMap>,
    direction: OrderByConst.Desc,
  };
};

export const paginationResolver = <
  T extends Record<string, `${OrderByConst}`>,
  KeyMap extends Record<keyof T, string>,
  DefaultOrderBy extends { key: keyof T; direction: `${OrderByConst}` },
>(
  query: {
    pagesize?: number;
    orderby?: T;
    skip?: number;
  },
  defaults: {
    orderBy?: DefaultOrderBy;
    orderByMap: Required<KeyMap>;
  }
) => {
  return {
    offset: query.skip || 0,
    limit: pageSizeUtil(query.pagesize),
    orderBy: sortUtil(defaults, query.orderby),
  };
};
