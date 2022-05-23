import type WalletConnect from '@walletconnect/client';
import { ethers } from 'ethers';

import { resolveWalletConnectProviderFromConfig } from '../../../common/providers/provider-resolver';
import type { InitOptions } from '../../../internal/types';

interface AuthOptions {
  walletConnectContext: WalletConnect;
  config: InitOptions;
}

const auth = ({ config, walletConnectContext }: AuthOptions) => ({
  getWalletConnectSession: (): WalletConnect => {
    return walletConnectContext;
  },
  getWalletConnectSigner: async () => {
    const walletConnectProvider = await resolveWalletConnectProviderFromConfig(
      config,
      walletConnectContext
    );

    const provider = new ethers.providers.Web3Provider(walletConnectProvider);
    return provider.getSigner();
  },
});

export default auth;
