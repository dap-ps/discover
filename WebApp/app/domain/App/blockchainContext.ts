import { Web3Provider } from 'ethers/providers';

// TODO: Update for embark
export interface BlockchainContext {
  library?: Web3Provider;
}

export let blockchainContext: BlockchainContext = {
  library: undefined,
};
