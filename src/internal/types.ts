export type ProvidersType = 'alchemy' | 'weedle' | undefined;

export interface InitOptions {
  serverUrl: string | undefined;
  appId: string | undefined;
  chain?: ProvidersType;
}

export type ChainType = 'ethereum';
