import type { InitOptions } from '../../internal/types';
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

  private getCurrentChain() {
    return this._config.chain || 'weedle';
  }

  private validateApiCall(functionName: string) {
    const chain = this.getCurrentChain();
    const nftProviderRegistry: any = NFTProviderRegistry(this._config);

    if (!chain || !nftProviderRegistry[chain]) throw new Error('');

    if (typeof nftProviderRegistry[chain][functionName] === undefined)
      throw new Error('');
  }

  getUsersNFTs(props: GetNFTForUsersInputProps): GetNFTForUsersResponse {
    const nftProviderRegistry: any = NFTProviderRegistry(this._config);

    this.validateApiCall('getUsersNFTs');

    return nftProviderRegistry[this.getCurrentChain()]?.getUsersNFTs(props);
  }

  getNFTMetadata(props: GetNFTMetadataInputProps): GetNFTMetadataResponse {
    const nftProviderRegistry: Record<string, NFTServiceProvider> =
      NFTProviderRegistry(this._config);

    this.validateApiCall('getNFTMetadata');

    return nftProviderRegistry[this.getCurrentChain()]?.getNFTMetadata(props);
  }

  getNFTsInCollection(
    props: GetNFTsInCollectionProps
  ): GetNFTsInCollectionResponse {
    const nftProviderRegistry: Record<string, NFTServiceProvider> =
      NFTProviderRegistry(this._config);

    this.validateApiCall('getNFTsInCollection');

    return nftProviderRegistry[this.getCurrentChain()]?.getNFTsInCollection(
      props
    );
  }
}

export default NFTModule;
