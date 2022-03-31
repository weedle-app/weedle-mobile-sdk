import type { InitOptions } from '../../internal/types';
import { AlchemyNFTQueryApi } from './alchemy';
import type { NFTServiceProvider } from './nft-types';

const registry = (options: InitOptions): Record<string, NFTServiceProvider> => {
  return {
    alchemy: new (AlchemyNFTQueryApi(options))(),
  };
};

export default registry;
