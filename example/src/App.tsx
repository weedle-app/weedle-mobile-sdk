import React, { useState, useEffect } from 'react';
import {
  useWalletConnect,
  // WalletConnectProviderProps,
} from '@walletconnect/react-native-dapp';
import { StyleSheet, View, Button, Linking, Text } from 'react-native';
import WeedleRnSdkView, {
  AuthServiceProvider,
  WeedleProvider,
} from 'weedle-rn-sdk';
import type { AuthServiceProviderProps } from '../../src/packages/auth';
import type WeedleApp from '../../src/internal/WeedleApp';
import * as contract from '../WeedleNFTTokenV1.json';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
// import GreeterABI from './web3/artifacts/contracts/Greeter.sol/Greeter.json';

// const contractAddress = '0x3d25ee677D981Fcb9d4Cefe603C7315AA33a82bb';
/*
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
const contractAddress = '0x3d25ee677D981Fcb9d4Cefe603C7315AA33a82bb';
let contract: Contract; */

const HandleWalletConnect = ({ client }: { client: WeedleApp }) => {
  /* const [account, setAccount] = useState();
  const provider = useRef<Web3Provider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner>(); */
  const connector = useWalletConnect();
  const [isConnected, setIsConnected] = useState(false);
  // const { getEvmBlock } = WeedleRnSdkView.WeedleNFT.useWeedleNFT();

  useEffect(() => {
    setIsConnected(connector.connected);
    if (connector.connected) {
      console.log({ acc: connector.accounts });
    }
  }, [connector]);

  const evt = (id: any, ad: any, qt: any) => {
    console.log({ id, ad, qt });
  };

  const testRunContract = async () => {
    console.log('ddddd');
    if (isConnected) {
      const a = client.nfts('weedle');

      console.log({
        a: connector.chainId,
        b: connector.rpcUrl,
        c: connector.networkId,
        d: connector.connected,
        e: connector.clientMeta,
      });
      const w = new WalletConnectProvider({
        connector,
        qrcode: false,
        rpc: {
          1337: 'http://127.0.0.1:8545',
        },
        chainId: 1337,
      });
      await w.enable();

      console.log('oooooo');

      /* const provider = new ethers.providers.Web3Provider(w);
      console.log('aaaaa'); */

      console.log(
        w.accounts,
        //await provider.getBalance(connector.accounts[0]),
        'ss'
      );
      /*  */

      /*
      if (a?.mintNFT) {
        a.mintNFT({
          contract,
          eventHandler: evt,
          mintingPrice: 1,
          signer: provider.getSigner(),
          userAddress: connector.accounts[0],
          contractAddress: '0x1dF2Ec09C1f1452483893E31A9424e30EF876b58',
        });
      } */
    }
  };

  return (
    <>
      <View style={styles.btnCnt}>
        {/* isConnected ? connector.accounts.map((ac) => <Text>{ac}</Text>) : null */}
        <Button onPress={testRunContract} title="Call Func" />
      </View>
      <Button
        title={isConnected ? 'Disconnect' : 'Connect'}
        onPress={() =>
          !isConnected ? connector.connect() : connector.killSession()
        }
      />
    </>
  );
};

const authProps: AuthServiceProviderProps = {
  adapter: 'walletconnect',
  options: {
    redirectUrl: 'wex://app',
  },
};

export default function App() {
  const client = WeedleRnSdkView.initialize({
    appId: 'someId',
    serverUrl: 'ddd',
    chain: 'alchemy',
  });

  useEffect(() => {
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      console.log({ initialUrl });
    })();

    Linking.addEventListener('url', (link) => {
      console.log({ link: link.url });
    });

    return () => {
      Linking.removeEventListener('url', console.log);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <WeedleProvider client={client}>
        <AuthServiceProvider {...authProps}>
          <HandleWalletConnect client={client} />
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
  btnCnt: {
    marginBottom: 10,
  },
});
