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
    alchemyQueryResponse: AlchemyNFTContractResponse
  ): NFTQueryModel {
    return {
      contract: {
        address: alchemyQueryResponse.contract.address,
      },
      tokenId: alchemyQueryResponse.id.tokenId,
      tokenType: alchemyQueryResponse.id.tokenMetadata.tokenType,
      balance: alchemyQueryResponse.balance as number,
      /* block: {
        hash: alchemyQueryResponse.blockHash || '',
      },
      totalPages: alchemyQueryResponse.totalCount || 0, */
      title: alchemyQueryResponse.title,
      description: alchemyQueryResponse.description,
      nftMedia: alchemyQueryResponse.media,
      tokenMedia: {
        gateway: alchemyQueryResponse.tokenUri.gateway,
        raw: alchemyQueryResponse.tokenUri.raw,
      },
      lastUpdate: alchemyQueryResponse.timeLastUpdated,
      metadata: {
        attributes: alchemyQueryResponse.metadata.attributes,
        description: alchemyQueryResponse.metadata.description,
        name: alchemyQueryResponse.metadata.name,
        otherAttributes: {
          image: alchemyQueryResponse.metadata.image,
        },
      },
    };
  }
}

export default AlchemyNFTModelTransformer;
