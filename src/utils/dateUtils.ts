export function getStartAndEndDate() {
  let start = new Date();
  start.setDate(start.getDate());
  start.setUTCHours(0, 0, 0, 0);
  let end = new Date();
  end.setDate(end.getDate());
  end.setUTCHours(23, 59, 59, 999);
  let startDate = start.toISOString();
  let endDate = end.toISOString();
  return { startDate, endDate };
}

export const kyselyDate = (date?: string | number | Date) => {
  if (date) return new Date(date).toISOString().slice(0, 19) as unknown as Date;
  return new Date().toISOString().slice(0, 19) as unknown as Date;
};
