export const tryCatchHandler = async <T>(
  input: (() => T | Promise<T>) | { label: string; fn: () => T | Promise<T> },
) => {
  try {
    if (typeof input === 'function') {
      return await input();
    }
    return await input?.fn();
  } catch (e) {
    if ('label' in input) {
      console.log(`:::TRY_CATCH_HANDLER_Error::Label - ${input?.label}:::`, e);
    }
    console.log(`:::TRY_CATCH_HANDLER_Error:::`, e);
    return null;
  }
};
