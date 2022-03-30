import type { InitOptions } from '../../internal/types';
import type { NFTServiceProvider } from './nft-types';
import NFTModule from './NFTModule';

const NFTAPI = (client?: InitOptions): NFTServiceProvider => {
  if (!client) throw new Error('Invalid key');
  const nftApiInstance = NFTModule.Instance;
  if (client) {
    nftApiInstance.config = client;
  }
  return nftApiInstance;
};

export default NFTAPI;
