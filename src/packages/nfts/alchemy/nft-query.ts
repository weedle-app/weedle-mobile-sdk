import type { InitOptions } from '../../../internal/types';
import BasePackage from '../../base-package';
import type {
  GetNFTForUsersInputProps,
  GetNFTForUsersResponse,
  GetNFTMetadataInputProps,
  GetNFTMetadataResponse,
  GetNFTsInCollectionProps,
  GetNFTsInCollectionResponse,
  NFTServiceProvider,
} from '../nft-types';

const NFTQueryApi = (config: InitOptions) =>
  class extends BasePackage implements NFTServiceProvider {
    constructor() {
      super(config);
    }

    getUsersNFTs(props: GetNFTForUsersInputProps): GetNFTForUsersResponse {
      console.log({ props, c: config });
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
