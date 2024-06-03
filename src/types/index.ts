export type ValueOf<T extends object> = T[keyof T];

export type MutableType<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};

export type PickByValue<T, ValueType> = Pick<
  T,
  { [key in keyof T]-?: T[key] extends ValueType ? key : never }[keyof T]
>;

/** Example: PickKeyType
 *
 * export type T_FormFieldTypes = {
 *   text: string;
 *   select: string;
 *   checkbox: boolean;
 * };
 *
 * type ChekcBoxType = PickKeyType<T_FormFieldTypes, "checkbox"> // boolen
 * type SelectType = PickKeyType<T_FormFieldTypes, "select"> //string
 * export type FormFiledTypes = keyof T_FormFieldTypes;
 */
export type PickKeyType<T, ValueType extends keyof T> = T[ValueType];

export type AwaitedFunctionGeneric<Func extends (...args: any) => any> =
  Awaited<ReturnType<Func>>;

export type UT_Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;

type ContainsUndefined<T> = undefined extends T ? 'yes' : 'no';

export type OmitUndefinedProperties<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};

export type OmitNonUndefinedProperties<T> = {
  [K in keyof T as undefined extends T[K] ? K : never]: T[K];
};

export type RequiredUndefinedtoPartial<T extends object> = UT_Prettify<
  OmitUndefinedProperties<T> & Partial<OmitNonUndefinedProperties<T>>
>;

export type NullToUndefined<T extends object> = {
  [K in keyof T]: null extends T[K] ? T[K] | undefined : T[K];
};

export type FlattenKeys<T, Prefix = ''> = {
  [K in keyof T]: T[K] extends object
    ?
        | `${Prefix & string}${K & string}`
        | FlattenKeys<T[K], `${Prefix & string}${K & string}.`>
    : `${Prefix & string}${K & string}`;
}[keyof T];

// type UnflattenKeys<T extends string, U = Record<string, unknown>> = T extends `${infer K}.${infer R}`
//   ? K extends keyof U
//     ? { [P in K]: UnflattenKeys<R, U[K]> }
//     : never
//   : T extends keyof U
//     ? { [P in T]: U[T] }
//     : never;

export type UnflattenKeys<
  T extends string | number | symbol,
  U,
> = T extends `${infer K}.${infer R}`
  ? K extends keyof U
    ? R extends string
      ? UnflattenKeys<R, U[K]>
      : never
    : never
  : T extends keyof U
    ? U[T]
    : never;
