import { initialize } from './packages/app/internal/registry';
import * as WeedleNFT from './packages/nfts';

export * from './packages/app';
export { default as AuthServiceProvider } from './packages/auth';

export default {
  initialize,
  WeedleNFT: WeedleNFT.default,
};
