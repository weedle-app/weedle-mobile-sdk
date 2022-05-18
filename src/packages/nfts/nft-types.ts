import type { Contract, Signer } from 'ethers';
import type { ProvidersType } from '../../internal/types';
import type { APIParams } from '../base-package';
// import type { ABIContractType } from '../types';

export interface GetNFTForUsersInputProps {
  userWalletAddress: string;
  pageSize?: string | number;
  startFromPage?: string | number;
  filterForContractsOnly?: Array<string>;
  provider?: ProvidersType;
}

export interface GetNFTMetadataInputProps {
  contractAddress: string;
  tokenId: string | number;
  provider?: ProvidersType;
  tokenType?: NFTTokenType;
}

export interface GetNFTsInCollectionProps {
  contractAddress: string;
  withMetadata: boolean;
  startFromPage: string | number;
}

type NFTTokenType = 'ERC721' | 'ERC1155';

interface NFTMediaType {
  raw: string;
  gateway: string;
}

interface MetaData {
  image: string;
  externalUrl: string;
  backgroundColor: string;
  name: string;
  description: string;
  attributes: string;
  genericAttributes: any;
}

interface NFTInstance {
  contract: {
    address: string;
  };
  NFTId: {
    tokenId: number;
    tokenMetadata: {
      tokenType: NFTTokenType;
    };
  };
  title: string;
  description: string;
  tokenUri: NFTMediaType;
  media: NFTMediaType;
  balance: string;
  metadata: MetaData;
  totalPages: number;
  pageKey: string;
  blockHash: string;
  error: string;
}

export interface GetNFTForUsersResponse {
  nfts: Array<NFTInstance> | RawProviderResponse;
}

export interface GetNFTMetadataResponse {
  nftMetadata: MetaData | RawProviderResponse;
}

export interface GetNFTsInCollectionResponse {
  nfts: Array<NFTInstance> | RawProviderResponse;
}

export type RawProviderResponse = any;

export interface MintNFTRequest extends APIParams {
  userAddress: string;
  signer: Signer;
  eventHandler: (
    tokenId: string,
    userWalletAddress: string,
    quantityMinted: number
  ) => void;
  contract: any;
  mintingPrice: number;
  contractAddress?: string;
  contractId?: string;
  provider?: any;
}

export interface MintNFTEvent {
  tokenId: number;
  userWalletAddress: string;
  quantity: number;
}

export interface NFTServiceProvider {
  /* getUsersNFTs: (props: GetNFTForUsersInputProps) => GetNFTForUsersResponse;
  getNFTMetadata: (props: GetNFTMetadataInputProps) => GetNFTMetadataResponse;
  getNFTsInCollection: (
    props: GetNFTsInCollectionProps
  ) => GetNFTsInCollectionResponse; */
  mintNFT?: (props: MintNFTRequest) => Promise<Contract>;
}
