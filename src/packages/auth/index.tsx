import React, { createContext, useContext } from 'react';
import { validateProps as validateWalletConnectProps } from './WalletConnectProvider';

import WalletConnectProvider, {
  type WalletConnectProviderProps,
} from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { IAsyncStorage } from './WalletConnectProvider/AsyncStorage';

type AuthAdapterTypes = 'walletconnect' | string;
type AuthAdapterOptions = Partial<WalletConnectProviderProps>;

export interface AuthServiceProviderProps {
  adapter: AuthAdapterTypes;
  options: AuthAdapterOptions | undefined;
}

const initOptions = {
  adapter: '',
  options: undefined,
  children: () => null,
  apiKey: '',
  serverUrl: '',
};

const WeedleAuthContext = createContext<AuthServiceProviderProps>(initOptions);

export const useWeedleAuthContext = () =>
  useContext<AuthServiceProviderProps>(WeedleAuthContext);

const AuthServiceProvider = (
  props: React.PropsWithChildren<AuthServiceProviderProps>
) => {
  if (!props) {
    throw new Error('Please provide an adapter type you wish to use.');
  }

  const renderAuthContainer = () => {
    switch (props.adapter) {
      case 'walletconnect': {
        validateWalletConnectProps(props.options as WalletConnectProviderProps);
        return WalletConnectProvider({
          ...(props.options as WalletConnectProviderProps),
          children: props.children as JSX.Element,
          storageOptions: {
            asyncStorage: AsyncStorage as unknown as IAsyncStorage,
          },
        });
      }
      default: {
        throw new Error('Please provide an adapter type you wish to use.');
      }
    }
  };

  return (
    <WeedleAuthContext.Provider
      value={{
        ...props,
      }}
    >
      {renderAuthContainer()}
    </WeedleAuthContext.Provider>
  );
};

export default AuthServiceProvider;
