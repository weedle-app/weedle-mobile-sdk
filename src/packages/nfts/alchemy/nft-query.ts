import type { InitOptions } from '../../app/internal/types';
import { getHttpClient } from '../../../utils/http-request-client';
import BasePackage from '../../shared/base-package';
import type {
  GetNFTForUsersInputProps,
  GetNFTForUsersResponse,
  GetNFTMetadataInputProps,
  GetNFTMetadataResponse,
  GetNFTsInCollectionProps,
  GetNFTsInCollectionResponse,
  NFTServiceProvider,
} from '../nft-types';
import AlchemyHelper from '../../shared/provider-helpers/alchemy-helper';

const NFTQueryApi = (config: InitOptions) =>
  class extends BasePackage implements NFTServiceProvider {
    httpClient = getHttpClient();
    alchemyHelper = AlchemyHelper;

    constructor() {
      super(config);
    }

    async getUsersNFTs(
      props: GetNFTForUsersInputProps
    ): Promise<GetNFTForUsersResponse> {
      try {
        const nfts = await this.httpClient.get(
          `/v2/demo/getNFTs/?owner=${props.userWalletAddress}`
        );
        console.log({ nfts });
      } catch (e) {
        console.log({ e });
      }
      return undefined as any;
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
