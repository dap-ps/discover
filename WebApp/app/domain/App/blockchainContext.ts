import { Web3Provider } from "ethers/providers";
import { AbstractConnector } from '@web3-react/abstract-connector'

export interface BlockchainContext {
  library?: Web3Provider,
  connector?: AbstractConnector,
}

export let blockchainContext: BlockchainContext = {
  library: undefined,
  connector: undefined,
}
