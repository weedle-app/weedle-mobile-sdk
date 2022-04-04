import type { NFTQueryModel } from '../../../nft-types';

export interface AlchemyNFTQueryResponse {
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
  balance: number | string;
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
  metadata: {
    name: string;
    description: string;
    image?: string;
    attributes: any;
  };
  timeLastUpdated: string;
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
}

export default AlchemyNFTModelTransformer;
