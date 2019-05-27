class SNTValidator {
  constructor(service) {
    this.service = service
  }

  async validateSNTTransferFrom(amount) {
    const toBalance = await this.service.balanceOf(
      this.service.sharedContext.account,
    )

    if (toBalance < amount) {
      throw new Error('Not enough SNT balance')
    }
  }

  async validateApproveAndCall(spender, amount) {
    const isTransferableToken = await this.service.transferable()
    if (!isTransferableToken) {
      throw new Error('Token is not transferable')
    }

    await this.validateSNTTransferFrom(amount)

    const allowance = await this.service.allowance(
      this.service.sharedContext.account,
      spender,
    )

    if (amount != 0 && allowance != 0) {
      throw new Error('You have allowance already')
    }
  }
}

export default SNTValidator
