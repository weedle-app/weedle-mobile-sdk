import type { InitOptions } from '../app/internal/types';
import type {
  GetNFTForUsersInputProps,
  GetNFTForUsersResponse,
  GetNFTMetadataInputProps,
  GetNFTMetadataResponse,
  GetNFTsInCollectionProps,
  GetNFTsInCollectionResponse,
  NFTModuleType,
  NFTProvidersRegistryType,
  NFTServiceProviderType,
} from './nft-types';
import NFTProviderRegistry from './registry';

class NFTModule implements NFTModuleType {
  private static _instance: NFTModule;
  private _config: InitOptions = { appId: '', serverUrl: '' };

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  set config(options: InitOptions) {
    this._config = options;
  }

  private getCurrentProviderName() {
    return this._config.provider || 'weedle';
  }

  private validateApiCall(functionName: string) {
    const provider = this.getCurrentProviderName() as string;
    const nftProviderRegistry: any = NFTProviderRegistry(this._config);

    // TODO - Add an error message for th throw
    if (!provider || !nftProviderRegistry[provider]) throw new Error('');

    if (typeof nftProviderRegistry[provider][functionName] === undefined)
      throw new Error('');
  }

  getCurrentProviderInstance(): NFTServiceProviderType {
    const nftProviderRegistry: NFTProvidersRegistryType = NFTProviderRegistry(
      this._config
    );
    return nftProviderRegistry[this.getCurrentProviderName()];
  }

  getUsersNFTs(
    props: GetNFTForUsersInputProps
  ): Promise<GetNFTForUsersResponse> {
    const nftProviderRegistry: NFTProvidersRegistryType = NFTProviderRegistry(
      this._config
    );

    this.validateApiCall('getUsersNFTs');

    return nftProviderRegistry[this.getCurrentProviderName()]?.getUsersNFTs(
      props
    );
  }

  getNFTMetadata(
    props: GetNFTMetadataInputProps
  ): Promise<GetNFTMetadataResponse> {
    const nftProviderRegistry: NFTProvidersRegistryType = NFTProviderRegistry(
      this._config
    );

    this.validateApiCall('getNFTMetadata');

    return nftProviderRegistry[this.getCurrentProviderName()]?.getNFTMetadata(
      props
    );
  }

  getNFTsInCollection(
    props: GetNFTsInCollectionProps
  ): Promise<GetNFTsInCollectionResponse> {
    const nftProviderRegistry: Record<string, NFTServiceProviderType> =
      NFTProviderRegistry(this._config);

    this.validateApiCall('getNFTsInCollection');

    return nftProviderRegistry[
      this.getCurrentProviderName()
    ]?.getNFTsInCollection(props);
  }
}

export default NFTModule;
