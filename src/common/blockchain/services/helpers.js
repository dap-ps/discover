export const broadcastContractFn = (contractMethod, account) => {
  return new Promise((resolve, reject) => {
    contractMethod
      .estimateGas({ from: account })
      .then(estimatedGas => {
        contractMethod
          .send({ from: account, gas: estimatedGas + 1000 })
          .on('transactionHash', hash => {})
          .on('receipt', receipt => {
            resolve(receipt.transactionHash)
          })
          .on('error', error => {
            reject(error)
          })
      })
      .catch(error => reject)
  })
}
