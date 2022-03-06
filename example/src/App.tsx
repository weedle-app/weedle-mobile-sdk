import React, { useState, useEffect } from 'react';

import {
  useWalletConnect,
  WalletConnectProviderProps,
} from '@walletconnect/react-native-dapp';

import { Button, StyleSheet, View } from 'react-native';
import WeedleRnSdkView, {
  AuthServiceProvider,
  WeedleProvider,
} from 'weedle-rn-sdk';

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

export default function App() {
  const client = WeedleRnSdkView.initialize({
    appId: 'someId',
    serverUrl: 'ddd',
  });

  const options: Partial<WalletConnectProviderProps> = {
    redirectUrl: 'exp://',
  };
  const props = {
    options,
    adapter: 'walletconnect',
  };

  return (
    <View style={styles.container}>
      <WeedleProvider client={client}>
        <AuthServiceProvider {...props}>
          <HandleWalletConnect />
        </AuthServiceProvider>
      </WeedleProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
