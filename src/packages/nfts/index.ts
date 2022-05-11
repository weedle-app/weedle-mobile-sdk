import type { InitOptions } from '../../internal/types';
import type { AllowedProviders } from '../types';
import type { NFTServiceProvider } from './nft-types';
import WeedleNFT from './weedle';

interface ProvidersType {
  weedle: NFTServiceProvider;
}

const getProvidersRegistry = (config: InitOptions): ProvidersType => ({
  weedle: WeedleNFT(config),
});

export default (providerType: AllowedProviders, config: InitOptions) =>
  getProvidersRegistry(config)[providerType];
