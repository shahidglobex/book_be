import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { LoggerUtil } from "./loggers.util";
import { appConfig } from "../config";

export const axiosRequestHandler = async <TResponse, TError = void>(
  config: AxiosRequestConfig,
  opts?: { label?: string }
) => {
  try {
    const res = await axios<TResponse>({ timeout: 7000, ...config });
    return { data: res.data, error: null };
  } catch (error) {
    if (error instanceof AxiosError) {
      axiosErrorLogger(
        opts?.label || `axiosRequestHandler::${config.url}`,
        error
      );
      return { data: null, error: error.response?.data as TError };
    }

    console.log(`>> Internal axiosRequestHandler:::${opts?.label}:::`, error);
    return { data: null, error: error as TError };
  }
};

export function axiosErrorLogger(label: string, error: AxiosError) {
  LoggerUtil.object({
    label: `AxiosError:::${label}:::`,
    object: {
      code: error?.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      method: error.response?.config?.method,
      url: error.response?.config?.url,
      data: error.response?.data,
    },
  });
}
