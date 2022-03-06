import { initialize } from './internal/registry';
export { default as AuthServiceProvider } from './packages/auth';
export * from './packages/app';

export default {
  initialize,
};
