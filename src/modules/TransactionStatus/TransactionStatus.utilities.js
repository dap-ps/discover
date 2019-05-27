const COOKIE_NAME = 'TRANSACTION_STATUS_COOKIE'

export const TYPE_NONE = 0
export const TYPE_SUBMIT = 1
export const TYPE_UPVOTE = 2
export const TYPE_DOWNVOTE = 3

class TransactionStatus {
  constructor() {
    this.dappId = ''
    this.dappTx = ''
    this.txDesc = ''
    this.dappName = ''
    this.dappImg = ''
    this.type = TYPE_NONE
    this.progress = false
    this.published = false
    this.failed = false
  }

  persistTransactionData() {
    localStorage.setItem(COOKIE_NAME, JSON.stringify(this))
  }

  setDappName(name) {
    this.dappName = name
    this.persistTransactionData()
  }

  setTransactionInfo(id, tx) {
    this.dappId = id
    this.dappTx = tx
    this.persistTransactionData()
  }

  setProgress(progress) {
    this.progress = progress
    this.published = false
    this.failed = false
    this.persistTransactionData()
  }

  setPublished(published) {
    this.progress = false
    this.published = published
    this.failed = false
    this.persistTransactionData()
  }

  setFailed(failed) {
    this.progress = false
    this.published = false
    this.failed = failed
    this.persistTransactionData()
  }

  setType(type) {
    this.type = type
    this.persistTransactionData()
  }
}

const getTransactionData = () => {
  return localStorage.getItem(COOKIE_NAME)
}

export const transactionStatusInitInstance = (name, img, desc, type) => {
  const model = new TransactionStatus()
  model.dappName = name
  model.dappImg = img
  model.progress = true
  model.txDesc = desc
  model.type = type
  return model
}

export const transactionStatusFetchedInstance = () => {
  const data = getTransactionData()
  let transactionStatus = new TransactionStatus()
  if (data !== null)
    transactionStatus = Object.assign(transactionStatus, JSON.parse(data))
  return transactionStatus
}
