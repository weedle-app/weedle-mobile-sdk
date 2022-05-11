import type { InitOptions } from '../../../internal/types';
import type { NFTServiceProvider } from '../nft-types';
import MinterContractApi from './MinterContractApi';

const createModule = (config: InitOptions): NFTServiceProvider => {
  // verify api key
  const contractInstance = MinterContractApi(config).prototype;
  return {
    mintNFT: contractInstance.mintNFT,
  };
};

export default createModule;
