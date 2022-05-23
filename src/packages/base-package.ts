import type { InitOptions } from '../internal/types';

class BasePackage {
  _config: InitOptions = { rpc: {}, provider: { name: 'weedle' } };

  constructor(config: InitOptions) {
    this._config = config;
  }

  set config(options: InitOptions) {
    this._config = options;
  }
}

export interface APIParams {
  contractKey?: string;
}

export default BasePackage;
