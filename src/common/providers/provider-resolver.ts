import type WalletConnect from '@walletconnect/client';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';

import type { InitOptions } from '../../internal/types';

const switchOrAddNetwork = async ({
  walletConnectContext,
  config,
  chainId,
}: {
  chainId: number;
  config: InitOptions;
  walletConnectContext: WalletConnect;
}) => {
  const hexChainId = ethers.utils.hexStripZeros(ethers.utils.hexlify(chainId));
  try {
    await walletConnectContext.sendCustomRequest({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: hexChainId,
        },
      ],
    });
  } catch (e: any) {
    const unknownChain = e.message.includes(
      'Try adding the chain using wallet_addEthereumChain first'
    );
    if (unknownChain) {
      await walletConnectContext.sendCustomRequest({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: hexChainId,
            rpcUrls: [config.provider?.url || config.rpc?.url],
            ...(config.networkMetaData ? config.networkMetaData : {}),
          },
        ],
      });
    } else {
      throw e;
    }
  }
};

export const resolveWalletConnectProviderFromConfig = async (
  config: InitOptions,
  walletConnectContext: WalletConnect
) => {
  let [rpc, chainId] = [{}, 0];

  if (config.provider) {
    const thirdPartyProvider = ethers.getDefaultProvider(
      config.provider.environment,
      {
        [config.provider.name as string]: config.provider.url,
      }
    );

    chainId = thirdPartyProvider.network.chainId;

    rpc = {
      [chainId]: config.provider.url,
    };

    if (chainId !== walletConnectContext.chainId) {
      await switchOrAddNetwork({ walletConnectContext, chainId, config });
    }
  }

  if (config.rpc) {
    chainId = config.rpc.chainId || 0;
    if (chainId !== walletConnectContext.chainId) {
      await switchOrAddNetwork({ walletConnectContext, chainId, config });
    }
    rpc = {
      [chainId as number]: config.rpc.url,
    };
  }

  if (!rpc) {
    rpc = { 1337: 'http://127.0.0.1:8545' };
  }

  const walletConnectProvider = new WalletConnectProvider({
    connector: walletConnectContext,
    rpc,
    chainId,
  });
  await walletConnectProvider.enable();

  return walletConnectProvider;
};
