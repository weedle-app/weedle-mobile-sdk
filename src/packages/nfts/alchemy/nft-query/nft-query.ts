import type { InitOptions } from '../../../app/internal/types';
import { getHttpClient } from '../../../shared/http-request-client';
import BasePackage from '../../../shared/base-package';
import type {
  GetNFTForUsersInputProps,
  GetNFTForUsersResponse,
  GetNFTMetadataInputProps,
  GetNFTMetadataResponse,
  GetNFTsInCollectionProps,
  GetNFTsInCollectionResponse,
  NFTQueryModel,
  NFTServiceProvider,
  RawProviderResponse,
} from '../../nft-types';
import AlchemyHelper from '../../../shared/provider-helpers/alchemy-helper';
import type { AxiosError } from 'axios';
import AlchemyNFTModelTransformer, {
  AlchemyNFTQueryResponse,
} from './models/alchemy-nft-query.model';

const NFTQueryApi = (config: InitOptions) =>
  class extends BasePackage implements NFTServiceProvider {
    httpClient = getHttpClient();
    alchemyHelper = AlchemyHelper;
    modelTransformer = AlchemyNFTModelTransformer;

    constructor() {
      super(config);
    }

    async getUsersNFTs(
      props: GetNFTForUsersInputProps
    ): Promise<GetNFTForUsersResponse> {
      try {
        const nftQueryResponse =
          await this.httpClient.get<AlchemyNFTQueryResponse>(
            `/getNFTs/?owner=${props.userWalletAddress}`
          );

        if (props.returnRawResponse) {
          return nftQueryResponse.data as RawProviderResponse;
        }

        const nfts: Array<NFTQueryModel> = nftQueryResponse.data.ownedNfts.map(
          (nft) => this.modelTransformer.toCommonQueryModel(nft)
        );

        return { nfts };
      } catch (error: any) {
        if (error.isAxiosError) {
          const axiosError = error as AxiosError;
          throw new Error(axiosError.response?.data);
        }
        throw new Error(error.message);
      }
    }

    getNFTMetadata(props: GetNFTMetadataInputProps): GetNFTMetadataResponse {
      console.log({ props });
      return undefined as any;
    }

    getNFTsInCollection(
      props: GetNFTsInCollectionProps
    ): GetNFTsInCollectionResponse {
      console.log({ props });
      return undefined as any;
    }
  };

export default NFTQueryApi;
