import type { InitOptions } from '../app/internal/types';
import { AlchemyNFTQueryApi } from './alchemy';
import type { NFTServiceProviderType } from './nft-types';

const registry = (
  options: InitOptions
): Record<string, NFTServiceProviderType> => {
  return {
    alchemy: new (AlchemyNFTQueryApi(options))(),
  };
};

export default registry;
