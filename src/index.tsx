import React from 'react';
/* import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native'; */
import WalletConnect from './Auth/WalletConnect/WalletConnect';

/* const LINKING_ERROR =
  `The package 'weedle-rn-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

type WeedleRnSdkProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'WeedleRnSdkView' */

export const WeedleRnSdkView = () => <WalletConnect />;

/* UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<WeedleRnSdkProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      }; */
