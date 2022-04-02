import type { InitOptions } from '../app/internal/types';
import type {
  GetNFTForUsersInputProps,
  GetNFTForUsersResponse,
  GetNFTMetadataInputProps,
  GetNFTMetadataResponse,
  GetNFTsInCollectionProps,
  GetNFTsInCollectionResponse,
  NFTServiceProvider,
} from './nft-types';
import NFTProviderRegistry from './registry';

class NFTModule implements NFTServiceProvider {
  private static _instance: NFTModule;
  private _config: InitOptions = { appId: '', serverUrl: '' };

  private constructor() {}

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  set config(options: InitOptions) {
    this._config = options;
  }

  private getCurrentProvider() {
    return this._config.provider || 'weedle';
  }

  private validateApiCall(functionName: string) {
    const provider = this.getCurrentProvider();
    const nftProviderRegistry: any = NFTProviderRegistry(this._config);

    if (!provider || !nftProviderRegistry[provider]) throw new Error('');

    if (typeof nftProviderRegistry[provider][functionName] === undefined)
      throw new Error('');
  }

  getUsersNFTs(
    props: GetNFTForUsersInputProps
  ): Promise<GetNFTForUsersResponse> {
    const nftProviderRegistry: any = NFTProviderRegistry(this._config);

    this.validateApiCall('getUsersNFTs');

    return nftProviderRegistry[this.getCurrentProvider()]?.getUsersNFTs(props);
  }

  getNFTMetadata(props: GetNFTMetadataInputProps): GetNFTMetadataResponse {
    const nftProviderRegistry: Record<string, NFTServiceProvider> =
      NFTProviderRegistry(this._config);

    this.validateApiCall('getNFTMetadata');

    return nftProviderRegistry[this.getCurrentProvider()]?.getNFTMetadata(
      props
    );
  }

  getNFTsInCollection(
    props: GetNFTsInCollectionProps
  ): GetNFTsInCollectionResponse {
    const nftProviderRegistry: Record<string, NFTServiceProvider> =
      NFTProviderRegistry(this._config);

    this.validateApiCall('getNFTsInCollection');

    return nftProviderRegistry[this.getCurrentProvider()]?.getNFTsInCollection(
      props
    );
  }
}

export default NFTModule;
