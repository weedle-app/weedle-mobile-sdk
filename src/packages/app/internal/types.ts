export type ProvidersType = 'alchemy' | 'weedle' | undefined;
export type ChainType = 'ethereum' | 'polygon' | 'matic' | 'solana';

export interface InitOptions {
  serverUrl: string | undefined;
  appId: string | undefined;
  chain?: ChainType;
  provider?: ProvidersType;
  network?: string;
}
