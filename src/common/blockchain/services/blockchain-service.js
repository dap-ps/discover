/* global web3 */

import EmbarkJS from '../../../embarkArtifacts/embarkjs';

class BlockchainService {
  constructor(sharedContext, contract, Validator) {
    this.contract = contract.address;

    this.sharedContext = sharedContext;
    this.validator = new Validator(this);
  }

  async getAccount() {
    try {
      if (web3 && EmbarkJS.Blockchain.Providers.web3) {
        const account = (await EmbarkJS.enableEthereum())[0];
        return (
          account || (await EmbarkJS.Blockchain.Providers.web3.getAccounts())[0]
        );
      }

      return '0x0000000000000000000000000000000000000000';
    } catch (error) {
      throw new Error(
        'Could not unlock an account. Consider installing Status on your mobile or Metamask extension'
      );
    }
  }

  async __unlockServiceAccount() {
    this.sharedContext.account = await this.getAccount();

    if (!this.sharedContext.account) {
      throw new Error('web3 is missing');
    }
  }
}

export default BlockchainService;
