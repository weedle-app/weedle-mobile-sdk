import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';

// type ProviderNameType = 'alchemy' | 'infura' | 'mainnet';
type EnvironmentNameType = 'mainnet' | 'ropsten' | 'rinkeby' | 'goerli';

const getClientId = (environment: string): number => {
  switch (environment) {
    case 'mainnet':
      return 1;
    case 'rinkeby':
      return 4;
    case 'ropsten':
      return 3;
    case 'goerli':
      return 5;
    default:
      return 1;
  }
};

export const WeedleProviderFactory = (
  environment: EnvironmentNameType = 'ropsten',
  url = '',
  writerObject?: any
) => {
  const chainId = getClientId(environment);
  const rpc = { [chainId]: url };
  if (writerObject) {
    return new WalletConnectProvider({
      rpc,
      connector: writerObject,
    });
  }
  return new ethers.providers.JsonRpcProvider(url);
};
