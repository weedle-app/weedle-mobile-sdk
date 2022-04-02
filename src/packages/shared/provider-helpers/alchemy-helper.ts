import logger from '../logger';
import type { ConnectionInfo, Network } from './web-types';

export default class AlchemyHelper {
  private static defaultApiKey = '10Z3HWpQBShRgm5Bg-vWcltJOiDP4RUQ';

  static getApiKey(apiKey: string | null): any {
    if (apiKey == null) {
      return this.defaultApiKey;
    }
    if (apiKey && typeof apiKey !== 'string') {
      logger.throwArgumentError('invalid apiKey', 'apiKey', apiKey);
    }
    return apiKey;
  }

  static getUrl(network: Network | string, apiKey: string): ConnectionInfo {
    let host = null;

    const normalizedNetworkName =
      typeof network === 'string' ? network : network.name;

    switch (normalizedNetworkName) {
      case 'homestead':
        host = 'eth-mainnet.alchemyapi.io/v2/';
        break;
      case 'ropsten':
        host = 'eth-ropsten.alchemyapi.io/v2/';
        break;
      case 'rinkeby':
        host = 'eth-rinkeby.alchemyapi.io/v2/';
        break;
      case 'goerli':
        host = 'eth-goerli.alchemyapi.io/v2/';
        break;
      case 'kovan':
        host = 'eth-kovan.alchemyapi.io/v2/';
        break;
      case 'matic':
        host = 'polygon-mainnet.g.alchemy.com/v2/';
        break;
      case 'maticmum':
        host = 'polygon-mumbai.g.alchemy.com/v2/';
        break;
      case 'arbitrum':
        host = 'arb-mainnet.g.alchemy.com/v2/';
        break;
      case 'arbitrum-rinkeby':
        host = 'arb-rinkeby.g.alchemy.com/v2/';
        break;
      case 'optimism':
        host = 'opt-mainnet.g.alchemy.com/v2/';
        break;
      case 'optimism-kovan':
        host = 'opt-kovan.g.alchemy.com/v2/';
        break;
      default:
        logger.throwArgumentError(
          'unsupported network',
          'network',
          arguments[0]
        );
    }

    return {
      url: 'https:/' + '/' + host + apiKey,
    };
  }
}
