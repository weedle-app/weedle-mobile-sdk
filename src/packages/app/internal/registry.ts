import type { InitOptions } from './types';
import WeedleApp, { validateAppConfig } from './WeedleApp';

export const initialize = (options: InitOptions) => {
  validateAppConfig(options);
  return new WeedleApp(options);
};
