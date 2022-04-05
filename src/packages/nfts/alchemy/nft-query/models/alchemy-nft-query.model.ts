import type { NFTMetaData, NFTQueryModel } from '../../../nft-types';

export interface AlchemyGetUsersNFTResponse {
  ownedNfts: AlchemyNFTContractResponse[];
  blockHash: string;
  totalCount: number;
}

export interface AlchemyNFTContractResponse {
  contract: { address: string };
  id: {
    tokenId: string;
    tokenMetadata: {
      tokenType: string;
    };
  };
  balance?: number | string;
  title: string;
  description: string;
  tokenUri: {
    raw: string;
    gateway: string;
  };
  media: Array<{
    raw: string;
    gateway: string;
  }>;
  metadata: any;
  timeLastUpdated: string;
}

export type AlchemyGetMetadataResponse = AlchemyNFTContractResponse & {
  timeLastUpdated: string;
};

export interface AlchemyNFTsInCollectionResponse {
  nfts: Array<AlchemyNFTContractResponse>;
  nextToken: string;
}

class AlchemyNFTModelTransformer {
  static toCommonQueryModel(
    alchemyQueryResponse: AlchemyNFTContractResponse,
    blockHash: string,
    owner: string
  ): NFTQueryModel {
    const {
      contract,
      id,
      balance,
      title,
      description,
      media,
      tokenUri,
      timeLastUpdated,
      ...rest
    } = alchemyQueryResponse;

    return {
      contract: {
        address: contract.address,
        type: id.tokenMetadata.tokenType,
      },
      block: {
        hash: blockHash,
      },
      tokenId: id.tokenId,
      balance: balance as number,
      title: title,
      description: description,
      owner,
      nftMedia: media.map(({ raw, gateway }) => ({ raw, uri: gateway })),
      tokenMedia: {
        uri: tokenUri.gateway,
        raw: tokenUri.raw,
      },
      lastUpdate: timeLastUpdated,
      metadata: rest,
    };
  }

  static toCommonMetaDataModel(
    alchemyQueryResponse: AlchemyGetMetadataResponse
  ): NFTMetaData {
    const {
      contract,
      description,
      id,
      media,
      metadata,
      title,
      tokenUri,
      timeLastUpdated,
    } = alchemyQueryResponse;

    return {
      contract: {
        address: contract.address,
        type: id.tokenMetadata.tokenType,
      },
      description,
      tokenId: id.tokenId,
      nftMedia: media.map(({ raw, gateway }) => ({ raw, uri: gateway })),
      tokenMedia: {
        uri: tokenUri.gateway,
        raw: tokenUri.raw,
      },
      title,
      metadata,
      lastUpdate: timeLastUpdated,
    };
  }

  static toCommonNFTsInCollectionModel(
    alchemyQueryResponse: AlchemyNFTContractResponse
  ): NFTQueryModel {
    const {
      contract,
      id,
      title,
      description,
      media,
      tokenUri,
      timeLastUpdated,
      ...rest
    } = alchemyQueryResponse;

    return {
      contract: {
        address: contract.address,
        type: id.tokenMetadata.tokenType,
      },
      tokenId: id.tokenId,
      title: title,
      description: description,
      nftMedia: media.map(({ raw, gateway }) => ({ raw, uri: gateway })),
      tokenMedia: {
        uri: tokenUri.gateway,
        raw: tokenUri.raw,
      },
      lastUpdate: timeLastUpdated,
      metadata: rest,
    };
  }
}

export default AlchemyNFTModelTransformer;
