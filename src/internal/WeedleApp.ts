import type { AuthServiceProviderProps } from '../packages/auth';
import AuthServiceProvider from '../packages/auth';
import type { InitOptions } from './types';
import NFTApi from '../packages/nfts';
import type { NFTServiceProvider } from '../packages/nfts/nft-types';
import type { AllowedProviders } from '../packages/types';

const verifyRpc = ({ rpc }: InitOptions): boolean => {
  if (rpc && ((rpc?.chainId && !rpc?.url) || (!rpc?.chainId && rpc?.url))) {
    return false;
  }

  return true;
};

const verifyProvider = ({ provider }: InitOptions) => {
  if (
    !provider?.name ||
    (provider?.name === 'weedle' && !provider?.appId) ||
    (provider?.name && !provider?.url)
  ) {
    return false;
  }

  return true;
};

export const validateAppConfig = (config: InitOptions): boolean => {
  const { provider, rpc } = config;
  if (!rpc && !provider) {
    throw new Error(
      'Invalid credentials provided! Please pass provider or rpc configuration'
    );
  }

  if (!verifyRpc(config) && !verifyProvider(config)) {
    throw new Error(
      'Invalid credentials provided! Please pass provider or rpc configuration'
    );
  }

  if (provider && rpc) {
    throw new Error('Please pass one of rpc or provider config and not both!');
  }

  if (!rpc && !verifyProvider(config)) {
    throw new Error('Missing or invalid provider credentials.');
  }

  if (!provider && !verifyRpc(config)) {
    throw new Error(
      'Missing or invalid rpc credentials please provide both chainid and url'
    );
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

  nfts(providerType: AllowedProviders): NFTServiceProvider | null {
    return NFTApi(providerType, this._config);
  }
}
