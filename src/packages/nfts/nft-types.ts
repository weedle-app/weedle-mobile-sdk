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

interface NFTMedia {
  raw: string;
  uri: string;
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
    type: string;
  };
  block: {
    hash: string;
    minted?: string;
  };
  tokenId: string;
  title: string;
  balance: number;
  nftMedia: NFTMedia[] | NFTMedia;
  owner: string;
  metadata: any;
  description?: string;
  tokenMedia?: NFTMedia[] | NFTMedia;
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
