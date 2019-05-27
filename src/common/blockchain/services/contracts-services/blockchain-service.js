/* global web3 */

import EmbarkJS from '../../../../embarkArtifacts/embarkjs'

const getAccount = async () => {
  try {
    const account = (await EmbarkJS.enableEthereum())[0]
    return (
      account || (await EmbarkJS.Blockchain.Providers.web3.getAccounts())[0]
    )
  } catch (error) {
    throw new Error(
      'Could not unlock an account. Consider installing Status on your mobile or Metamask extension',
    )
  }
}

class BlockchainService {
  constructor(sharedContext, contract, Validator) {
    this.contract = contract.address

    this.sharedContext = sharedContext
    this.validator = new Validator(this)
  }

  async __unlockServiceAccount() {
    if (web3 && EmbarkJS.Blockchain.Providers.web3) {
      this.sharedContext.account = await getAccount()
    } else {
      throw new Error('web3 is missing')
    }
  }
}

export default BlockchainService
