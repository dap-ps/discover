const COOKIE_NAME = 'TRANSACTION_STATUS_COOKIE'

export const TYPE_NONE = 0
export const TYPE_SUBMIT = 1
export const TYPE_UPVOTE = 2
export const TYPE_DOWNVOTE = 3
export const TYPE_WITHDRAW = 4
export const TYPE_UPDATE = 5

class TransactionStatus {
  constructor() {
    this.dappId = '' // responsible for background transaction check
    this.dappTx = '' // responsible for background transaction check
    this.txDesc = ''
    this.dappName = '' // responsible for UI visibility
    this.dappImg = ''
    this.type = TYPE_NONE
    this.progress = false
    this.published = false
    this.publishedEmpty = false
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
    this.publishedEmpty = false
    this.failed = false
    this.persistTransactionData()
  }

  setPublished(published) {
    this.progress = false
    this.published = published
    this.publishedEmpty = false
    this.failed = false
    this.persistTransactionData()
  }

  setFailed(failed) {
    this.progress = false
    this.published = false
    this.publishedEmpty = false
    this.failed = failed
    this.persistTransactionData()
  }

  setPublishedEmpty(published) {
    this.progress = false
    this.published = false
    this.publishedEmpty = published
    this.failed = false
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
