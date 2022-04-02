import type { AuthServiceProviderProps } from '../../auth';
import AuthServiceProvider from '../../auth';
import type { InitOptions } from './types';
import * as NFTApi from '../../nfts';
import type { NFTServiceProvider } from '../../nfts/nft-types';
import { getHttpClient } from '../../shared/http-request-client';
import { parseAppConfig } from '../../shared/config-helper';

export default class WeedleApp {
  isInitialized = false;
  config: InitOptions;

  constructor(private readonly _config: InitOptions) {
    this.config = parseAppConfig(this._config);
    if (this.config) {
      this.isInitialized = true;
    }

    if (this.config.serverUrl) {
      getHttpClient().setHttpClientConfig({
        baseURL: _config.serverUrl,
        timeout: 60000,
      });
    }
  }

  getConfig(): InitOptions {
    return this.config;
  }

  auth({ adapter, options }: AuthServiceProviderProps) {
    return AuthServiceProvider({ adapter, options });
  }

  nfts(): NFTServiceProvider {
    return NFTApi.default(this.config);
  }
}
