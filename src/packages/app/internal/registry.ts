import { parseAppConfig } from '../../shared/config-helper';
import type { InitOptions } from './types';
import WeedleApp from './WeedleApp';

export const initialize = (options: InitOptions) => {
  const config = parseAppConfig(options);
  return new WeedleApp(config);
};
