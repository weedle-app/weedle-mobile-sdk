export type ProvidersType = 'alchemy' | 'weedle' | undefined;

export interface InitOptions {
  rpc?: {
    url?: string;
    chainId?: number;
  };
  provider?: {
    name: ProvidersType;
    url?: string;
    appId?: string;
  };
}
