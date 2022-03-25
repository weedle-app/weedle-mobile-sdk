import type { WalletConnectProviderProps } from '@walletconnect/react-native-dapp';

export const validateProps = (options: WalletConnectProviderProps) => {
  if (!options.redirectUrl) {
    throw new Error(
      'Redirect Url prop is missing, please provide a value for it.'
    );
  }
};
