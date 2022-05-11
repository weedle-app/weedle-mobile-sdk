interface ABIInputType {
  internalType: string;
  name: string;
  type: string;
}

interface ABIContentType {
  inputs: ABIInputType[];
  stateMutability: string;
  type: string;
}

export interface ABIContractType {
  _format: string;
  contractName: string;
  sourceName: string;
  abi: ABIContentType[];
  bytecode: string;
  deployedBytecode: string;
  linkReferences: Record<string, unknown>;
  deployedLinkReferences: Record<string, unknown>;
}

export type AllowedProviders = 'weedle';
