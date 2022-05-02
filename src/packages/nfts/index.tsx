import type { InitOptions } from '../app/internal/types';
import type { NFTModuleType } from './nft-types';
import NFTModule from './NFTModule';

const NFTAPI = (client?: InitOptions): NFTModuleType => {
  const nftApiInstance = NFTModule.Instance;
  if (client) {
    nftApiInstance.config = client;
  }
  return nftApiInstance;
};

export default NFTAPI;
