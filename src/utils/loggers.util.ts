import util from 'util';

export function TimeLogger() {
  let startTime = Date.now();

  return {
    newStartTime: (time?: number) => {
      startTime = time ?? Date.now();
    },
    checkTime: (logLabel: string) => {
      console.log(
        `::${logLabel}:: elapsed time >> `,
        Date.now() - startTime,
        'ms',
      );
    },
  };
}

export const LoggerUtil = {
  object: ({ label, object }: { label: string; object: object }) =>
    console.log(
      label,
      util.inspect(object, false, null, true /* enable colors */),
    ),

  objectJson: ({ label, object }: { label: string; object: object }) =>
    console.log(label, JSON.stringify(object, null, 2)),

  timeLogger: TimeLogger,
};
