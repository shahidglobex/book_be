import type { InsertObjectOrList } from 'kysely/dist/cjs/parser/insert-values-parser';
import type { NullToUndefined, RequiredUndefinedtoPartial } from '../../types';
import type { DB, Generated } from 'kysely-codegen';
import type { RawBuilder } from 'kysely';
import { kysely } from '../../providers/db/kysely.db';

// type test = UndefinedtoPartial<{ name: string | undefined; age: number }>;
//  converts to {age: number; name?: string | undefined;}

type KyselyColumnTypeResolver<
  Table extends DB[keyof DB],
  TableNameKey extends keyof Table,
> = Table[TableNameKey] extends Generated<unknown>
  ? Table[TableNameKey]['__insert__']
  : Table[TableNameKey] | RawBuilder<unknown>;

type KyselyTableTypeMapper<Table extends DB[keyof DB]> = {
  [P in keyof Table]: KyselyColumnTypeResolver<Table, P>;
};

type KyselyTableTypeOptional<Table extends DB[keyof DB]> =
  RequiredUndefinedtoPartial<NullToUndefined<KyselyTableTypeMapper<Table>>>;

export const KInsert = <T extends keyof DB>(input: {
  table: T;
  values: KyselyTableTypeOptional<DB[T]>;
}) => input.values;

export const KyselyInsert = <T extends keyof DB>(
  dbConn: typeof kysely,
  input: {
    table: T;
    values: KyselyTableTypeOptional<DB[T]> | KyselyTableTypeOptional<DB[T]>[];
  },
) => {
  return dbConn
    .insertInto(input.table)
    .values(input.values as InsertObjectOrList<DB, T>);
};
