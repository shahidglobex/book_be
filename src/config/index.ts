import { envConfig } from './env.config';
import { pluginConfig } from './plugin.config';
import { whiteListConfig } from './whiteList.config';

export const appConfig = Object.freeze({
  ...envConfig,
  ...whiteListConfig,
});

export const appPluginConfig = pluginConfig;
