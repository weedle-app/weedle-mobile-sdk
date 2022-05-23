import React, { useState, useEffect } from 'react';
import {
  useWalletConnect,
  // WalletConnectProviderProps,
} from '@walletconnect/react-native-dapp';
import { StyleSheet, View, Button, Linking } from 'react-native';
import WeedleRnSdk, {
  AuthServiceProvider,
  WeedleProvider,
  useWeedleAuth,
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
  const { getWalletConnectSession, getWalletConnectSigner } = useWeedleAuth();
  const [isConnected, setIsConnected] = useState(false);
  // const { getEvmBlock } = WeedleRnSdkView.WeedleNFT.useWeedleNFT();

  useEffect(() => {
    setIsConnected(connector.connected);
    if (connector.connected) {
      const a = getWalletConnectSession();

      // console.log({ acc: a.accounts, au: connector.connected });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector]);

  const evt = (id: any, ad: any, qt: any) => {
    console.log({ id, ad, qt });
  };
  //WeedleRnSdk.;
  const testRunContract = async () => {
    if (isConnected) {
      const a = await getWalletConnectSigner();
      // console.log(a._isSigner, a._address, 'signer');
      /* const a = client.nfts('weedle');

      const provider = new ethers.providers.Web3Provider(w);
      const bal = await provider.getBalance(connector.accounts[0]);

      console.log(
        w.chainId,
        ethers.utils.formatEther(bal)
        //provider.getSigner()
      );

      if (a?.mintNFT) {
        try {
          const contRes = await a.mintNFT({
            contract,
            eventHandler: evt,
            mintingPrice: 1,
            signer: provider.getSigner(),
            userAddress: connector.accounts[0],
            contractAddress: '0xaC89B6FCA7821B9e28AF6e1bDF907120e412Bc1a',
            provider,
          });

          // contRes.on('NFTMinted', console.log);
        } catch (e) {
          console.log(e);
        }
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
  const client = WeedleRnSdk.initialize({
    rpc: {
      url: 'http://localhost:8545',
      chainId: 1337,
    },
    /* provider: {
      name: 'alchemy',
      url: 'https://eth-ropsten.alchemyapi.io/v2/<key>>',
      environment: 'ropsten',
    }, */
    /*  rpc: {
      chainId: 137,
      url: 'https://rpc-mainnet.matic.network',
    },
    networkMetaData: {
      chainName: 'Matic Mainnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
    }, */
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
