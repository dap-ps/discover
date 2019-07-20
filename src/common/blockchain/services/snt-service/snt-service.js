import { broadcastContractFn } from '../helpers'

import BlockchainService from '../blockchain-service'

import SNTValidator from './snt-validator'
import MiniMeToken from '../../../../embarkArtifacts/contracts/MiniMeToken'

const SNTToken = MiniMeToken

class SNTService extends BlockchainService {
  constructor(sharedContext) {
    super(sharedContext, SNTToken, SNTValidator)
  }

  async allowance(from, to) {
    return SNTToken.methods
      .allowance(from, to)
      .call({ from: this.sharedContext.account })
  }

  async balanceOf(account) {
    return SNTToken.methods
      .balanceOf(account)
      .call({ from: this.sharedContext.account })
  }

  async controller() {
    return SNTToken.methods
      .controller()
      .call({ from: this.sharedContext.account })
  }

  async transferable() {
    return SNTToken.methods
      .transfersEnabled()
      .call({ from: this.sharedContext.account })
  }

  async approveAndCall(spender, amount, callData) {
    const ConnectedSNTToken = await super.__unlockServiceAccount(SNTToken)
    await this.validator.validateApproveAndCall(spender, amount)
    return broadcastContractFn(
      ConnectedSNTToken.methods.approveAndCall(
        spender,
        amount.toString(),
        callData,
      ).send,
      this.sharedContext.account,
    )
  }

  // This is for testing purpose only
  async generateTokens() {
    const ConnectedSNTToken = await super.__unlockServiceAccount(SNTToken)

    await ConnectedSNTToken.methods
      .generateTokens(this.sharedContext.account, 10000)
      .send({ from: this.sharedContext.account })
  }
}

export default SNTService
