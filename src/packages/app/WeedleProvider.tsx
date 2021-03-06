import React, { createContext, useContext } from 'react';
import type { InitOptions } from './internal/types';
import type WeedleApp from './internal/WeedleApp';

interface WeedleProviderProps {
  options: InitOptions;
}

interface WeedleContextProps {
  client: WeedleApp;
}

const initOptions: WeedleProviderProps = {
  options: {
    appId: undefined,
    serverUrl: undefined,
    chain: undefined,
    network: undefined,
    provider: undefined,
  },
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
        options: {
          ...config,
        },
      }}
    >
      {props.children}
    </WeedleAppContext.Provider>
  );
};

export default WeedleProvider;
