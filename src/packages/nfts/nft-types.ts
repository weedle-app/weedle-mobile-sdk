import type { ProvidersType } from '../app/internal/types';

export interface GetNFTForUsersInputProps {
  userWalletAddress: string;
  pageSize?: string | number;
  startFromPage?: string | number;
  filterForContractsOnly?: Array<string>;
  provider?: ProvidersType;
  returnRawResponse?: boolean;
}

export interface GetNFTMetadataInputProps {
  contractAddress: string;
  tokenId: string | number;
  provider?: ProvidersType;
  tokenType?: NFTTokenType;
  returnRawResponse?: boolean;
}

export interface GetNFTsInCollectionProps {
  contractAddress: string;
  withMetadata: boolean;
  startFromPage: string | number;
  returnRawResponse?: boolean;
}

type NFTTokenType = 'ERC721' | 'ERC1155';

interface NFTMedia {
  raw?: string;
  uri?: string;
}

export interface NFTMetaData {
  contract: {
    address: string;
    type: string;
  };
  tokenId: string;
  title: string;
  description: string;
  tokenMedia: NFTMedia;
  nftMedia: NFTMedia[] | NFTMedia;
  metadata?: any;
  lastUpdate?: string;
}

export interface NFTQueryModel {
  contract: {
    address: string;
    type: string;
  };
  block?: {
    hash: string;
    minted?: string;
  };
  tokenId: string;
  title: string;
  balance?: number;
  tokenMedia: NFTMedia;
  nftMedia: NFTMedia[] | NFTMedia;
  owner?: string;
  metadata: any;
  description?: string;
  lastUpdate?: string;
}

export interface NFTsListFromQuery {
  nfts: Array<NFTQueryModel>;
  totalPages?: number | undefined;
  pageKey?: string;
}

export interface GetNFTForUsersResponse {
  nfts: NFTsListFromQuery | RawProviderResponse;
}

export interface GetNFTMetadataResponse {
  nftMetadata: NFTMetaData | RawProviderResponse;
}

export interface GetNFTsInCollectionResponse {
  nfts: Array<NFTQueryModel> | RawProviderResponse;
  nextPageToken: string;
}

export type RawProviderResponse = any;

export interface NFTModuleType {
  getUsersNFTs: (
    props: GetNFTForUsersInputProps
  ) => Promise<GetNFTForUsersResponse>;
  getNFTMetadata: (
    props: GetNFTMetadataInputProps
  ) => Promise<GetNFTMetadataResponse>;
  getNFTsInCollection: (
    props: GetNFTsInCollectionProps
  ) => Promise<GetNFTsInCollectionResponse>;
  getCurrentProviderInstance(): NFTServiceProviderType;
}

interface NFTServiceProvider {
  getProviderName(): string | undefined;
}

export type NFTServiceProviderType = NFTModuleType & NFTServiceProvider;

export type NFTProvidersRegistryType = Record<string, NFTServiceProviderType>;
