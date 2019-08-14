export const broadcastContractFn = (contractMethod, account) => {
  return contractMethod
    .estimateGas({ from: account })
    .then(estimatedGas => {
      contractMethod
        .send({ from: account, gas: estimatedGas + 1000 })
        .on('transactionHash', hash => {
          resolve(hash)
        })
        .on('error', error => {
          reject(error)
        })
    })
    .catch(error => reject)
}
