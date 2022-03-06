import React, { createContext, useContext } from 'react';
import type WeedleApp from '../../internal/WeedleApp';

interface WeedleProviderProps {
  appId: string | undefined;
  serverUrl: string | undefined;
}

interface WeedleContextProps {
  client: WeedleApp;
}

const initOptions = {
  appId: undefined,
  serverUrl: undefined,
};

const WeedleAppContext = createContext<WeedleProviderProps>(initOptions);

export const useWeedleApp = () =>
  useContext<WeedleProviderProps>(WeedleAppContext);

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
