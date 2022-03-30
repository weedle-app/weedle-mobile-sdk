import type { InitOptions } from '../internal/types';

class BasePackage {
  _config: InitOptions = { appId: '', serverUrl: '' };

  constructor(config: InitOptions) {
    this._config = config;
  }

  set config(options: InitOptions) {
    this._config = options;
  }
}

export default BasePackage;
