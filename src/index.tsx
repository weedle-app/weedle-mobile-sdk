import 'reflect-metadata';
import { initialize } from './packages/app/internal/registry';
export { default as AuthServiceProvider } from './packages/auth';
import * as WeedleNFT from './packages/nfts';
export * from './packages/app';

export default {
  initialize,
  WeedleNFT: WeedleNFT.default,
};
