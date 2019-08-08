/* global web3 */

const TRANSACTION_STATUSES = {
  Failed: 0,
  Successful: 1,
  Pending: 2,
}

const waitOneMoreBlock = async function(prevBlockNumber) {
  return new Promise(resolve => {
    setTimeout(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      if (prevBlockNumber === blockNumber) {
        return waitOneMoreBlock(prevBlockNumber)
      }
      resolve()
    }, 30000)
  })
}

export default {
  getTxStatus: async txHash => {
    if (!txHash) {
      return TRANSACTION_STATUSES.Successful
    }

    const txReceipt = await web3.eth.getTransactionReceipt(txHash)
    if (txReceipt) {
      await waitOneMoreBlock(txReceipt.blockNumber)

      return txReceipt.status
        ? TRANSACTION_STATUSES.Successful
        : TRANSACTION_STATUSES.Failed
    }

    return TRANSACTION_STATUSES.Pending
  },
}

const checkNetwork = async () => {
  web3.eth.net.getId().then(networkId => {
    return networkId === 1 ? 'true' : 'false'
  })
}

export { checkNetwork }
