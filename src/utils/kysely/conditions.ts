// import type { ExpressionBuilder } from 'kysely';
// import type { DB } from 'kysely-codegen';

// type KyselyCmpr<TB extends keyof DB> = Parameters<ExpressionBuilder<DB, TB>['cmpr']>;

// const conditionMaker = <TB extends keyof DB, T extends TB>({
//   cmpr,
// }: {
//   table: TB;
//   cmpr: KyselyCmpr<T>;
// }) => cmpr;

// const conditionMaker2 = <TB extends keyof DB, T extends TB>({
//   cmpr,
// }: {
//   table: TB;
//   cmpr: {
//     [key in keyof DB[TB]]?:
//       | {
//           [field in KyselyCmpr<T>['1'] & string]?: DB[TB][key];
//         }
//       | DB[TB][key];
//   };
// }) => {
//   const Field = [] as KyselyCmpr<T>[];

//   Object.keys(cmpr).forEach((key) => {
//     const conditionsObj = cmpr[key as keyof typeof cmpr] as {
//       [field in symbol | string]: any;
//     };
//     if (typeof key === 'object' && typeof key !== 'undefined') {
//       Object.keys(conditionsObj).forEach((condKey) => {
//         const val = conditionsObj[condKey] as KyselyCmpr<T>['2'];
//         if (typeof val !== 'undefined') {
//           Field.push([key as KyselyCmpr<T>['0'], condKey as KyselyCmpr<T>['1'], val]);
//         }
//       });
//     } else if (typeof key !== 'undefined') {
//       Field.push([key as KyselyCmpr<T>['0'], '=', cmpr[key as keyof typeof cmpr]]);
//     }
//   });

//   return Field;
// };

// type T_KyselyDB<TB extends keyof DB> = Partial<{
//   [key in keyof DB[TB]]: DB[TB][key];
// }>;

// type T_KyselyDB2<TB extends keyof DB> = Record<keyof DB[TB], unknown>;

// // const cond: T_KyselyDB<'createmaster'> = {
// //   mstrname: 'dtyd',
// // };

// const defaultConditions = <TB extends keyof DB>(
//   cmpr: ExpressionBuilder<DB, TB>['cmpr']['caller'],
//   inputs: (Parameters<ExpressionBuilder<DB, TB>['cmpr']> | null)[],
// ) =>
//   inputs.filter(Boolean).map((v) => cmpr(...(v as Parameters<ExpressionBuilder<DB, TB>['cmpr']>)));

// export const kyselyConditionUtils = {
//   defaultConditions,
//   conditionMaker,
//   conditionMaker2,
// };
