export const broadcastContractFn = (contractMethod, account) => {
  return new Promise((resolve, reject) => {
    contractMethod({ from: account })
      .on('transactionHash', hash => {
        resolve(hash)
      })
      .on('error', error => {
        reject(error.message)
      })
  })
}
