import type { AuthServiceProviderProps } from '../packages/auth';
import AuthServiceProvider from '../packages/auth';
import type { InitOptions } from './types';

export const validateAppConfig = (options: InitOptions): boolean => {
  if (!options.appId) {
    throw new Error("Missing or invalid WeedleOption property 'appId'.");
  }

  if (!options.serverUrl) {
    throw new Error("Missing or invalid WeedleOption property 'serverUrl'.");
  }

  return true;
};

export default class WeedleApp {
  isInitialized = false;
  constructor(private readonly _config: InitOptions) {
    if (validateAppConfig(_config)) {
      this.isInitialized = true;
    }
  }

  getConfig(): InitOptions {
    return this._config;
  }

  auth({ adapter, options }: AuthServiceProviderProps) {
    validateAppConfig(this._config);
    return AuthServiceProvider({ adapter, options });
  }
}
