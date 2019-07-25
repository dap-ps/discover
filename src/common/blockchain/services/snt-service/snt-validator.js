const BN = require('bn.js')

class SNTValidator {
  constructor(service) {
    this.service = service
  }

  async validateSNTTransferFrom(amount) {
    const toBalance = await this.service.balanceOf(
      this.service.sharedContext.account,
    )

    const toBalanceBN = new BN(toBalance, 10)

    if (amount.gt(toBalanceBN)) {
      throw new Error('Not enough SNT balance')
    }
  }

  async validateApproveAndCall(spender, amount) {
    const isTransferableToken = await this.service.transferable()
    if (!isTransferableToken) {
      throw new Error('Token is not transferable')
    }

    await this.validateSNTTransferFrom(amount)
  }
}

export default SNTValidator
