import React, { useState, useEffect } from 'react';
import {
  useWalletConnect,
  // WalletConnectProviderProps,
} from '@walletconnect/react-native-dapp';
import { StyleSheet, View, Button, Linking } from 'react-native';
import WeedleRnSdkView, {
  AuthServiceProvider,
  WeedleProvider,
} from 'weedle-rn-sdk';
import type { AuthServiceProviderProps } from '../../src/packages/auth';
import type {
  NFTQueryModel,
  RawProviderResponse,
} from '../../src/packages/nfts/nft-types';
// import GreeterABI from './web3/artifacts/contracts/Greeter.sol/Greeter.json';

// const contractAddress = '0x3d25ee677D981Fcb9d4Cefe603C7315AA33a82bb';
/*
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
const contractAddress = '0x3d25ee677D981Fcb9d4Cefe603C7315AA33a82bb';
let contract: Contract; */

const HandleWalletConnect = () => {
  /* const [account, setAccount] = useState();
  const provider = useRef<Web3Provider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner>(); */
  const connector = useWalletConnect();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(connector.connected);
    if (connector.connected) {
      console.log({ acc: connector.accounts });
    }
  }, [connector]);

  const testRunContract = async () => {
    /* const r = await getEvmBlock(
      contractAddress,
      'greet',
      GreeterABI.abi,
      connector
    );
    console.log({ r }); */
  };

  return (
    <>
      <View style={styles.btnCnt}>
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
    appId: 'demo',
    serverUrl: 'https://eth-mainnet.alchemyapi.io',
    chain: 'ethereum',
    network: 'homestead',
    provider: 'alchemy',
  });

  useEffect(() => {
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      console.log({ initialUrl });

      const nfList: RawProviderResponse = await client.nfts().getUsersNFTs({
        userWalletAddress: '0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D',
        returnRawResponse: true,
      });

      console.log({ bash: nfList.blockHash });
      /* nfList.nfts.forEach((nft: RawProviderResponse) =>
        console.log({ a: nft.blockHash })
      ); */
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
  btnCnt: {
    marginBottom: 10,
  },
});
