export type ConnectionInfo = {
  url: string;
  headers?: { [key: string]: string | number };
  timeout?: number;
};

export type Network = {
  name: string;
  chainId?: number;
  ensAddress?: string;
  _defaultProvider?: (providers: any, options?: any) => any;
};

export type Networkish = Network | string | number;
