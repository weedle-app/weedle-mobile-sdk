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
  NFTServiceProviderType,
  RawProviderResponse,
} from '../../nft-types';
import AlchemyHelper from '../../../shared/provider-helpers/alchemy-helper';
import type { AxiosError } from 'axios';
import AlchemyNFTModelTransformer, {
  AlchemyGetMetadataResponse,
  AlchemyGetUsersNFTResponse,
  AlchemyNFTsInCollectionResponse,
} from './models/alchemy-nft-query.model';

const NFTQueryApi = (config: InitOptions) =>
  class extends BasePackage implements NFTServiceProviderType {
    httpClient = getHttpClient();
    alchemyHelper = AlchemyHelper;
    modelTransformer = AlchemyNFTModelTransformer;

    constructor() {
      super(config);
    }

    getProviderName(): string {
      return 'AlchemyNFTQueryProvider';
    }

    getCurrentProviderInstance(): NFTServiceProviderType {
      return this;
    }

    async getUsersNFTs(
      props: GetNFTForUsersInputProps
    ): Promise<GetNFTForUsersResponse> {
      try {
        const nftQueryResponse =
          await this.httpClient.get<AlchemyGetUsersNFTResponse>(
            `/getNFTs/?owner=${props.userWalletAddress}`
          );

        if (props.returnRawResponse) {
          return nftQueryResponse.data as RawProviderResponse;
        }

        const nfts: Array<NFTQueryModel> = nftQueryResponse.data.ownedNfts.map(
          (nft) =>
            this.modelTransformer.toCommonQueryModel(
              nft,
              nftQueryResponse.data.blockHash,
              props.userWalletAddress
            )
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

    async getNFTMetadata(
      props: GetNFTMetadataInputProps
    ): Promise<GetNFTMetadataResponse> {
      try {
        const nftQueryResponse =
          await this.httpClient.get<AlchemyGetMetadataResponse>(
            `/getNFTMetadata/?contractAddress=${props.contractAddress}`
          );

        if (props.returnRawResponse) {
          return nftQueryResponse.data as RawProviderResponse;
        }

        const nftMetadata = this.modelTransformer.toCommonMetaDataModel(
          nftQueryResponse.data
        );

        return { nftMetadata };
      } catch (error: any) {
        if (error.isAxiosError) {
          const axiosError = error as AxiosError;
          throw new Error(axiosError.response?.data);
        }
        throw new Error(error.message);
      }
    }

    async getNFTsInCollection(
      props: GetNFTsInCollectionProps
    ): Promise<GetNFTsInCollectionResponse> {
      try {
        const nftQueryResponse =
          await this.httpClient.get<AlchemyNFTsInCollectionResponse>(
            `/getNFTMetadata/?contractAddress=${props.contractAddress}&withMetadata=true`
          );

        if (props.returnRawResponse) {
          return nftQueryResponse.data as RawProviderResponse;
        }

        const nfts: Array<NFTQueryModel> = nftQueryResponse.data.nfts.map(
          (nft) => this.modelTransformer.toCommonNFTsInCollectionModel(nft)
        );

        return { nfts, nextPageToken: nftQueryResponse.data.nextToken };
      } catch (error: any) {
        if (error.isAxiosError) {
          const axiosError = error as AxiosError;
          throw new Error(axiosError.response?.data);
        }
        throw new Error(error.message);
      }
    }
  };

export default NFTQueryApi;
