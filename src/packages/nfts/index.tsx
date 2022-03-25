// import type { ContractInterface } from 'ethers';
/* import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers'; */
import type { ChainType } from '../../internal/types';
import { useWeedleApp } from '../app';
import EvmNFTAPIs from './evm';

export interface NFTServiceProviderProps {
  /* getEvmBlock: (
    contractAddress: string,
    functionName: string,
    abi: ContractInterface,
    connector: any
  ) => Promise<any>; */
  mintNFT: () => void;
}

const useWeedleNFT = (
  chain: ChainType = 'ethereum'
): NFTServiceProviderProps => {
  const { appId, serverUrl } = useWeedleApp();
  if (!appId && !serverUrl)
    throw new Error('Please initialize a client first!');

  const nftApis: Record<ChainType, NFTServiceProviderProps> = {
    ethereum: EvmNFTAPIs,
  };
  return nftApis[chain];
};

export const getNFTAPIFactory = (chain: ChainType = 'ethereum') => {
  const nftApis: Record<ChainType, NFTServiceProviderProps> = {
    ethereum: EvmNFTAPIs,
  };
  return nftApis[chain];
};

export { useWeedleNFT };
