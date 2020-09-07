// This file is just a stub showing a sample Api request saga.
// For more information on Saga see: https://redux-saga.js.org/

import { fork } from 'redux-saga/effects';
import { TransactionSaga } from './sagas/transactions.saga';
import { AccountSaga } from './sagas/account.saga';

export default function* walletSaga() {
  yield fork(TransactionSaga);
  yield fork(AccountSaga);
}
