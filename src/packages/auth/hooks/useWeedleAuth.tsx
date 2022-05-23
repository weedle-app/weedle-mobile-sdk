import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useWeedleApp } from '../../app';

import auth from '../lib/wallet-connect';

const useWeedleAuth = () => {
  const walletConnectContext = useWalletConnect();
  const { config } = useWeedleApp();

  return auth({ walletConnectContext, config });
};

export default useWeedleAuth;
