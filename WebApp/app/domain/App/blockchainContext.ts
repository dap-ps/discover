import EmbarkJS from 'embarkArtifacts/embarkjs'
import Web3 from 'web3'

export const getNetworkName = (id: number) => {
  //  - "homestead" or 1 (or omit; this is the default network)
  //  - "ropsten"   or 3
  //  - "rinkeby"   or 4
  //  - "goerli"    or 5
  //  - "kovan"     or 42
  switch(id) {
    case 1: 
      return 'homestead'
    case 3:
      return 'ropsten'
    case 4:
      return 'rinkeby'
    case 5:
      return 'goerli'
    case 42:
      return 'kovan'
    default:
      return 'homestead'
  }
}
// TODO tie embark to this 
export interface IEmbark {
  Blockchain: any,
  Contract: any,
  Messages: any,
  Storage: any,
  Utils: any,
  enableEthereum: Function,
  isNewWeb3: Function,
  isNode: Function,
  onReady: Function
}

export const checkNetwork = async () => {
}

export const getNetworkId = () => {
  return parseInt(`${process.env['NETWORK']}`)
}

export const getRpcUrl = () => {
  return `wss://${getNetworkName(getNetworkId())}.infura.io/ws/v3/${process.env['INFRUA_KEY']}`
}

export const getAccount = async () => {
  try {
    // @ts-ignore
    if (web3 && EmbarkJS.Blockchain.Providers.web3) {
      const account = (await EmbarkJS.enableEthereum())[0]
      return (
        // @ts-ignore
        account || (await EmbarkJS.Blockchain.Providers.web3.getAccounts())[0]
      )
    }

    return '0x0000000000000000000000000000000000000000'
  } catch (error) {
    throw new Error(
      'Could not unlock an account. Consider installing Status on your mobile or Metamask extension',
    )
  }
}

export const connectContract = async (Contract: any) => {
  const clonedContract = Contract.clone()
    // @ts-ignore
  const provider = EmbarkJS.Blockchain.Providers.web3.getCurrentProvider()
  if (!provider.selectedAddress) {
    // @ts-ignore
    EmbarkJS.Blockchain.Providers.web3.setProvider(new Web3.providers.WebsocketProvider(getRpcUrl()))
    // @ts-ignore
    clonedContract.currentProvider = EmbarkJS.Blockchain.Providers.web3.getCurrentProvider()
  }

  return clonedContract
}