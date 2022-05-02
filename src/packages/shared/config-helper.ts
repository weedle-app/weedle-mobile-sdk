import type { InitOptions } from '../app/internal/types';
import AlchemyHelper from './provider-helpers/alchemy-helper';

export const parseAppConfig = (options: InitOptions): InitOptions => {
  if (options.provider === 'weedle') {
    if (!options.serverUrl || !options.appId) {
      throw new Error(
        'Provider Initialization Error: Please provide ServerUrl and Api key!'
      );
    }
  }

  if (options.provider === 'alchemy') {
    if (
      !options.serverUrl &&
      !(options.appId && options.chain && options.network)
    ) {
      throw new Error(
        'Could not initialize provider, please provide all necessary params.'
      );
    }

    const alchemyConnect = AlchemyHelper.getUrl(
      options.network as string,
      options.appId as string
    );

    return { ...options, serverUrl: alchemyConnect.url };
  }
  return options;
};
