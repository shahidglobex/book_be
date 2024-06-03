import { sql, type ColumnType, type SelectQueryBuilder } from "kysely";
import type { DB, Generated } from "kysely-codegen";

import { UT_Prettify, UnflattenKeys } from "../../types";
import { isValidJson } from "../isValidators";

// type nkldd = SelectQueryBuilder<DB, 'brand' | 'brand_endpoints' | 'group', {}>;

// type jljfk = Parameters<nkldd['select']>[0];

type T_KyselyStringUnion<T> = T extends string ? T : never;

// type dkjfgdkfd = T_KyselyStringUnion<jljfk>;

// type hhkjh = DB['brand_endpoints'];

// Example usage
// type OriginalType = UnflattenKeys<'brand.created_at', DB>;

type T_KyselyFlatKeyToType<T extends { [key: string]: string }> = {
  [K in keyof T]: UnflattenKeys<T[K], DB>;
};

type KyselyColumnTypeResolver<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K] extends Generated<unknown>
    ? T[K]["__select__"]
    : T[K] extends ColumnType<unknown, unknown, unknown>
      ? T[K]["__select__"]
      : T[K];
};
// type hkdhd = T_KyselyFlatKeyToType<{
//   type: 'brand_endpoints.type';
// }>;

type T_ResolveParsedObject<
  TProperty extends string,
  TStructure extends Record<string, any>,
> = Record<
  TProperty,
  Array<
    UT_Prettify<KyselyColumnTypeResolver<T_KyselyFlatKeyToType<TStructure>>>
  >
>;

export const KyselySelectJson = <
  TTables extends keyof DB,
  TSelectInstance extends SelectQueryBuilder<DB, TTables, object>,
  TStructure extends Record<
    string,
    T_KyselyStringUnion<Parameters<TSelectInstance["select"]>[0]>
  >,
  TProperty extends string,
>(input: {
  tables?: TTables[];
  structure: TStructure;
  propertyName: TProperty;
}) => {
  const jsonString = Object.entries(input.structure)
    .reduce(
      (acc, [currKey, currVal]) => acc.concat(`'${currKey}',`, currVal, ","),
      ""
    )
    .slice(0, -1); // to remove the trailing comma;

  //   sql<string>`COALESCE(
  //   json_arrayagg(
  //       json_object(
  //           'type',
  //           brand_endpoints.type,
  //           'endpoint',
  //           brand_endpoints.endpoint
  //       )
  //   ),
  //   '[]'
  // )`.as('brandEndpoints');

  const sqlString =
    `COALESCE(json_arrayagg(json_object(${jsonString})),'[]')` as unknown as TemplateStringsArray;

  // console.log('🚀 ~ file: select.ts:71 ~ sqlString:', sqlString);
  return {
    sql: sql<string>(sqlString).as(input.propertyName),
    resultMapper: <Result extends Record<string, unknown>>(result: Result) => {
      const resultJsonString = result[input.propertyName] as string;
      // console.log('🚀 ~ file: select.ts:74 ~ result:', result);

      if (!isValidJson(resultJsonString)) {
        throw new Error(
          ":::KyselySelectJsonError:: Invalid Json in the parse for the property in result"
        );
      }

      const parsedObject = {
        [input.propertyName]: JSON.parse(resultJsonString),
      } as UT_Prettify<T_ResolveParsedObject<TProperty, TStructure>>;

      return {
        ...(result as UT_Prettify<Omit<Result, TProperty>>),
        ...parsedObject,
      };
    },
  };
};

// const res = KyselyJson({
//   tables: [ 'brand_endpoints', ],
//   propertyName: 'brandEndpoints',
//   keys: { type: 'brand_endpoints.type', date: 'brand.created_at' },
// });

// res.sql
// const resMapped = res.resultMapper({ name: 'tom' });
