import NFTAPI from '../../../packages/nfts';
import type { NFTServiceProviderType } from '../../../packages/nfts/nft-types';
import type { InitOptions } from '../../../packages/app/internal/types';

const options: InitOptions = {
  chain: 'ethereum',
  appId: 'SomeId',
  network: 'homestead',
  provider: 'alchemy',
  serverUrl: 'SomeUrl',
};

export function isNFTServiceProviderType(
  object: any
): object is NFTServiceProviderType {
  return (
    typeof object.getUsersNFTs === 'function' &&
    typeof object.getNFTMetadata === 'function' &&
    typeof object.getNFTsInCollection === 'function' &&
    typeof object.getCurrentProviderInstance === 'function' &&
    typeof object.getProviderName === 'function'
  );
}

describe('NFTAPI', () => {
  it('should return AlchemyNFTQueryProvider if alchemy is passed as a provider', () => {
    const nftApiInstance = NFTAPI(options);
    const expectedProviderName = nftApiInstance
      .getCurrentProviderInstance()
      .getProviderName();
    expect(expectedProviderName).toBe('AlchemyNFTQueryProvider');
  });

  it('should return instance of NFTServiceProviderType', () => {
    const nftApiInstance = NFTAPI(options);
    const expectedProviderInstanc = nftApiInstance.getCurrentProviderInstance();
    expect(isNFTServiceProviderType(expectedProviderInstanc)).toBeTruthy();
  });
});
