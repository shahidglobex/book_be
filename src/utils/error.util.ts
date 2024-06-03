import { APP_HTTP_ERROR } from "./types";

export class AppError extends Error {
  public statusCode: number;
  public error: {
    errorCode: string;
    message?: string;
  };
  public data: any;

  constructor(
    { errorCode, statusCode, message }: APP_HTTP_ERROR,
    customMessage?: string,
    data?: any
  ) {
    super(customMessage || message);

    this.statusCode = statusCode;
    this.error = {
      errorCode,
      message: customMessage || message,
    };
    this.data = data || null;
  }
}

export const RedisIoErrorHandler = async (fn: any) => {
  try {
    return await fn;
  } catch (error) {
    console.log("Error In RedisIo >> \n", error);

    return null;
  }
};
