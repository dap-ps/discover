import withdrawInitialState from '../../common/data/withdraw'
import reducerUtil from '../../common/utils/reducer'
import {
  onReceiveTransactionInfoAction,
  checkTransactionStatusAction,
  onStartProgressAction,
  hideAction,
} from '../TransactionStatus/TransactionStatus.reducer'
import { TYPE_WITHDRAW } from '../TransactionStatus/TransactionStatus.utilities'
import { showAlertAction } from '../Alert/Alert.reducer'

import BlockchainSDK from '../../common/blockchain'

const SHOW_WITHDRAW_AFTER_CHECK = 'WITHDRAW_SHOW_WITHDRAW_AFTER_CHECK'
const CLOSE_WITHDRAW = 'WITHDRAW_CLOSE_WITHDRAW'
const ON_INPUT_SNT_VALUE = 'WITHDRAW_ON_INPUT_SNT_VALUE'

export const showWithdrawAfterCheckAction = (dapp, withdrawMax) => {
  window.location.hash = 'withdraw'
  return {
    type: SHOW_WITHDRAW_AFTER_CHECK,
    payload: { dapp, withdrawMax },
  }
}

export const showWithdrawAction = dapp => {
  return async (dispatch, getState) => {
    const state = getState()
    if (
      state.transactionStatus.progress &&
      state.transactionStatus.dappTx !== ''
    ) {
      dispatch(
        showAlertAction(
          'There is a pending transaction. Please wait for it to finish and then you will be able to submit your Ðapp',
        ),
      )
    } else {
      const blockchain = await BlockchainSDK.getInstance()
      const withdrawMax = await blockchain.DiscoverService.withdrawMax(dapp.id)
      dispatch(showWithdrawAfterCheckAction(dapp, parseInt(withdrawMax, 10)))
    }
  }
}

export const closeWithdrawAction = () => {
  window.history.back()
  return {
    type: CLOSE_WITHDRAW,
    payload: null,
  }
}

export const withdrawAction = (dapp, sntValue) => {
  return async dispatch => {
    dispatch(closeWithdrawAction())
    dispatch(
      onStartProgressAction(
        dapp.name,
        dapp.image,
        dapp.description,
        TYPE_WITHDRAW,
      ),
    )
    try {
      const blockchain = await BlockchainSDK.getInstance()
      const tx = await blockchain.DiscoverService.withdraw(dapp.id, sntValue)
      dispatch(onReceiveTransactionInfoAction(dapp.id, tx))
      dispatch(checkTransactionStatusAction(tx, 'Withdrawn'))
    } catch (e) {
      dispatch(hideAction())
      dispatch(showAlertAction(e.message))
    }
  }
}

export const onInputSntValueAction = sntValue => ({
  type: ON_INPUT_SNT_VALUE,
  payload: sntValue,
})

const showWithdrawAfterCheck = (state, payload) => {
  const { dapp, withdrawMax } = payload
  return Object.assign({}, state, {
    visible: true,
    dapp,
    withdrawMax,
    sntValue: dapp.sntValue.toString(),
  })
}

const closeWithdraw = state => {
  return Object.assign({}, state, {
    visible: false,
    dapp: null,
    withdrawMax: Number.MAX_SAFE_INTEGER,
  })
}

const onInputSntValue = (state, sntValue) => {
  return Object.assign({}, state, {
    sntValue,
  })
}

const map = {
  [SHOW_WITHDRAW_AFTER_CHECK]: showWithdrawAfterCheck,
  [CLOSE_WITHDRAW]: closeWithdraw,
  [ON_INPUT_SNT_VALUE]: onInputSntValue,
}

export default reducerUtil(map, withdrawInitialState)
