import { Contract, ethers } from 'ethers';
import type { InitOptions } from '../../../internal/types';
import BasePackage from '../../base-package';
import type { MintNFTRequest } from '../nft-types';

const MinterContractApi = (config: InitOptions) =>
  class extends BasePackage {
    async mintNFT(props: MintNFTRequest): Promise<Contract> {
      // verify api key
      // fetch abi if remote
      // create hash and signature
      // console.log({ config });
      // console.log(props.userAddress, props.contract.abi, props.signer);

      const contract = new ethers.Contract(
        props.contractAddress || '',
        props.contract.abi,
        props.signer
      );

      const options = props.mintingPrice
        ? { value: ethers.utils.parseEther(String(props.mintingPrice)) }
        : {};

      contract.on('NFTMinted', console.log);

      return contract.reedemAndMint(
        '0x6a68cd00350eebdded3723d2236aafaf56f7318202d11f479562b9d0c4f5f0c1',
        '0xfc07e541624201b4c0c4cc8c54d7d9d89732a044508e9b6d7b4c53a615f5904239d74364b9f5e388f0b01eabafadfbf22b97724cd3bce0fe8a9e5b642c06169e1b',
        options
      );
    }
  };

export default MinterContractApi;
