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
  name: string;
  description: string;
  attributes: string | any;
  otherAttributes?: any;
}

export interface NFTQueryModel {
  contract: {
    address: string;
  };
  tokenId: string;
  tokenType: string;
  title: string;
  description: string;
  tokenMedia: NFTMediaType;
  nftMedia: NFTMediaType[] | NFTMediaType;
  balance: number;
  metadata: MetaData;
  totalPages?: number | undefined;
  pageKey?: string;
  block?: {
    hash: string;
  };
  lastUpdate?: string;
}

export interface GetNFTForUsersResponse {
  nfts: Array<NFTQueryModel> | RawProviderResponse;
}

export interface GetNFTMetadataResponse {
  nftMetadata: MetaData | RawProviderResponse;
}

export interface GetNFTsInCollectionResponse {
  nfts: Array<NFTQueryModel> | RawProviderResponse;
}

export type RawProviderResponse = any;

export interface NFTServiceProvider {
  getUsersNFTs: (
    props: GetNFTForUsersInputProps
  ) => Promise<GetNFTForUsersResponse>;
  getNFTMetadata: (props: GetNFTMetadataInputProps) => GetNFTMetadataResponse;
  getNFTsInCollection: (
    props: GetNFTsInCollectionProps
  ) => GetNFTsInCollectionResponse;
}
