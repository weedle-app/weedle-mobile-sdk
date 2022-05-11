import { ethers } from 'ethers';
import type { InitOptions } from '../../../internal/types';
import BasePackage from '../../base-package';
import type { MintNFTRequest } from '../nft-types';

const MinterContractApi = (config: InitOptions) =>
  class extends BasePackage {
    async mintNFT(props: MintNFTRequest): Promise<void> {
      // verify api key
      // fetch abi if remote
      // create hash and signature
      console.log({ config });
      const contract = new ethers.Contract(
        props.userAddress,
        props.contract.abi,
        props.signer
      );

      const options = props.mintingPrice
        ? { value: ethers.utils.parseEther(String(props.mintingPrice)) }
        : {};

      return contract.reedemAndMint(
        '0x965f67f56748cc89dc69df6d0db5a9a726d4f51b79792b11f2dd8ea8d7ebeeab',
        '0x415cc178fed81a49139140156f4bb149b047d33aaf00b8264ac33b7f18f655604ab70e08d06ea0b97c72b3e8b068923dc393f4f778b2d2f87ebd56032f77f3351c',
        options
      );

      // contract.on('NFTMinted', props.eventHandler);
    }
  };

export default MinterContractApi;
