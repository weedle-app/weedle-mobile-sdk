import React, { createContext, useContext } from 'react';
import { validateProps as validateWalletConnectProps } from './WalletConnect';

import WalletConnectProvider, {
  type WalletConnectProviderProps,
} from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { IAsyncStorage } from './WalletConnect/AsyncStorage';
import { useWeedleApp } from '../app';
import { validateAppConfig } from '../../internal/WeedleApp';

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

  const { appId, serverUrl } = useWeedleApp();
  validateAppConfig({ appId, serverUrl });

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
