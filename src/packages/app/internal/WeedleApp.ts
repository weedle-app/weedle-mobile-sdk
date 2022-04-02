import type { AuthServiceProviderProps } from '../../auth';
import AuthServiceProvider from '../../auth';
import type { InitOptions } from './types';
import * as NFTApi from '../../nfts';
import type { NFTServiceProvider } from '../../nfts/nft-types';
import { getHttpClient } from '../../../utils/http-request-client';

export const validateAppConfig = (options: InitOptions): boolean => {
  // TODO - think about validating on alchemy or infura etc level only.
  // The idea is when using weedle all you need is a appID and serverUrl
  // For alchemy etc, you should either provide serverUrl and appId or you provide the other items then we can form it
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

    if (_config.serverUrl) {
      getHttpClient().setHttpClientConfig({
        baseURL: _config.serverUrl,
        timeout: 60000,
      });
    }
  }

  getConfig(): InitOptions {
    return this._config;
  }

  auth({ adapter, options }: AuthServiceProviderProps) {
    validateAppConfig(this._config);
    return AuthServiceProvider({ adapter, options });
  }

  nfts(): NFTServiceProvider {
    return NFTApi.default(this._config);
  }
}
