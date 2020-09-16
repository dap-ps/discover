// This file is just a stub showing a sample Api request saga.
// For more information on Saga see: https://redux-saga.js.org/

import { fork, call, put } from 'redux-saga/effects';
import { TransactionSaga } from './sagas/transactions.saga';
import { AccountSaga } from './sagas/account.saga';
import { getNetworkId } from 'domain/App/blockchainUtils';
import { setNetworkAction } from 'domain/App/actions';

export default function* walletSaga() {
  yield fork(TransactionSaga);
  yield fork(AccountSaga);
  const networkId = yield call(async () => getNetworkId())
  yield put(setNetworkAction(networkId))
}
