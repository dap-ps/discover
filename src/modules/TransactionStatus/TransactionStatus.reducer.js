import transactionStatusInitialState from '../../common/data/transaction-status'
import reducerUtil from '../../common/utils/reducer'
import {
  transactionStatusFetchedInstance,
  transactionStatusInitInstance,
  TYPE_NONE,
} from './TransactionStatus.utilities'
import { onUpdateDappDataAction } from '../Dapps/Dapps.reducer'
import { showAlertAction } from '../Alert/Alert.reducer'
import BlockchainSDK from '../../common/blockchain'
import DappModel from '../../common/data/dapp'

const HIDE = 'TXS_HIDE'
const ON_START_PROGRESS = 'TXS_ON_START_PROGRESS'
const ON_RECEIVE_TRANSACTION_TX = 'TXS_ON_RECEIVE_TRANSACTION_TX'
const ON_CHANGE_TRANSACTION_STATUS_DATA =
  'TXS_ON_CHANGE_TRANSACTION_STATUS_DATA'

export const hideAction = () => ({
  type: HIDE,
  payload: null,
})

export const onStartProgressAction = (dappName, dappImg, desc, type) => ({
  type: ON_START_PROGRESS,
  payload: { dappName, dappImg, desc, type },
})

export const onReceiveTransactionInfoAction = (id, tx) => ({
  type: ON_RECEIVE_TRANSACTION_TX,
  payload: { id, tx },
})

// status 0/1/2 failed/success/pending
export const onChangeTransactionStatusDataAction = transactionStatus => ({
  type: ON_CHANGE_TRANSACTION_STATUS_DATA,
  payload: transactionStatus,
})

export const checkTransactionStatusAction = tx => {
  return async dispatch => {
    const transacationStatus = transactionStatusFetchedInstance()
    if (tx == undefined) {
      transacationStatus.setPublishedEmpty(true)
      dispatch(onChangeTransactionStatusDataAction(transacationStatus))
      return
    }
    let status = 2
    try {
      status = await BlockchainSDK.utils.getTxStatus(tx)
    } catch (e) {
      // if can't read current status from network assume it is still waiting
    }
    const statusInt = parseInt(status, 10)

    let dapp

    switch (statusInt) {
      case 0:
        transacationStatus.setFailed(true)
        break
      default:
      case 1:
        transacationStatus.setPublished(true)
        try {
          const blockchain = await BlockchainSDK.getInstance()
          dapp = await blockchain.DiscoverService.getDAppDataById(
            transacationStatus.dappId,
          )
          dapp = DappModel.instanceFromBlockchainWithMetadata(dapp)
          dispatch(onUpdateDappDataAction(dapp))
        } catch (e) {
          dispatch(
            showAlertAction(e.message, 'OK', '', () => {
              window.location.reload()
            }),
          )
        }
        transacationStatus.setTransactionInfo('', '')
        break
      case 2:
        transacationStatus.setProgress(true)
        setTimeout(() => {
          dispatch(checkTransactionStatusAction(tx))
        }, 2000)
        break
    }

    dispatch(onChangeTransactionStatusDataAction(transacationStatus))
  }
}

const hide = state => {
  const transacationStatus = transactionStatusFetchedInstance()
  transacationStatus.setDappName('')
  transacationStatus.setType(TYPE_NONE)
  return Object.assign({}, state, transacationStatus)
}

const onStartProgress = (state, payload) => {
  const { dappName, dappImg, desc, type } = payload
  const transacationStatus = transactionStatusInitInstance(
    dappName,
    dappImg,
    desc,
    type,
  )
  transacationStatus.persistTransactionData()
  return Object.assign({}, state, transacationStatus)
}

const onReceiveTransactionInfo = (state, payload) => {
  const { id, tx } = payload
  const transacationStatus = transactionStatusFetchedInstance()
  transacationStatus.setTransactionInfo(id, tx)
  return Object.assign({}, state, transacationStatus)
}

const onChangeTransactionStatusData = (state, transacationStatus) => {
  return Object.assign({}, state, transacationStatus)
}

const map = {
  [HIDE]: hide,
  [ON_START_PROGRESS]: onStartProgress,
  [ON_RECEIVE_TRANSACTION_TX]: onReceiveTransactionInfo,
  [ON_CHANGE_TRANSACTION_STATUS_DATA]: onChangeTransactionStatusData,
}

export default reducerUtil(map, transactionStatusInitialState)
