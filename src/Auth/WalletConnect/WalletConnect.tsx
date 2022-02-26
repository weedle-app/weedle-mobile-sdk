import WalletConnectProvider, {
  useWalletConnect,
} from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useEffect, useState } from 'react';

import { Button } from 'react-native';
import type { IAsyncStorage } from './AsyncStorage';

const HandleWalletConnect = () => {
  const connector = useWalletConnect();
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    setIsConnected(connector.connected);
  }, [connector.connected]);
  return (
    <Button
      title={isConnected ? 'Disconnect' : 'Connect'}
      onPress={() =>
        !isConnected ? connector.connect() : connector.killSession()
      }
    />
  );
};

const WalletConnect = () => {
  return (
    <WalletConnectProvider
      redirectUrl={'exp://'}
      storageOptions={{
        asyncStorage: AsyncStorage as unknown as IAsyncStorage,
      }}
    >
      <HandleWalletConnect />
    </WalletConnectProvider>
  );
};

export default WalletConnect;
