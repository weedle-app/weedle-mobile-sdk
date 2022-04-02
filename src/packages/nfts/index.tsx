import type { InitOptions } from '../app/internal/types';
import type { NFTServiceProvider } from './nft-types';
import NFTModule from './NFTModule';

const NFTAPI = (client?: InitOptions): NFTServiceProvider => {
  const nftApiInstance = NFTModule.Instance;
  if (client) {
    nftApiInstance.config = client;
  }
  return nftApiInstance;
};

export default NFTAPI;
