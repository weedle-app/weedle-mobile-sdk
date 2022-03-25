export interface InitOptions {
  serverUrl: string | undefined;
  appId: string | undefined;
  automaticDataCollectionEnabled?: boolean;
}

export type ChainType = 'ethereum';