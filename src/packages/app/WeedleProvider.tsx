import React, { createContext, useContext } from 'react';
import type WeedleApp from '../../internal/WeedleApp';

type Web3ProviderNameType = 'alchemy' | 'infura' | 'mainnet';

interface Web3provider {
  name: Web3ProviderNameType;
}

interface WeedleProviderProps {
  appId: string | undefined;
  serverUrl: string | undefined;
  web3Provider?: Web3provider;
}

interface WeedleContextProps {
  client: WeedleApp;
}

const initOptions = {
  appId: undefined,
  serverUrl: undefined,
};

const WeedleAppContext = createContext<WeedleProviderProps>(initOptions);

export const useWeedleApp = () => {
  const context = useContext<WeedleProviderProps>(WeedleAppContext);
  if (!context) {
    throw new Error('useWeedleApp must be used within WeedleProvider');
  }
  return context;
};

const WeedleProvider = (props: React.PropsWithChildren<WeedleContextProps>) => {
  const { client = null } = props;
  if (client && !client.isInitialized) {
    throw new Error(
      'You need to initialize the app before use. Please call .initialize({serverUrl, appId}) first.'
    );
  }
  const config = client?.getConfig();

  return (
    <WeedleAppContext.Provider
      value={{
        appId: config?.appId,
        serverUrl: config?.serverUrl,
      }}
    >
      {props.children}
    </WeedleAppContext.Provider>
  );
};

export default WeedleProvider;
