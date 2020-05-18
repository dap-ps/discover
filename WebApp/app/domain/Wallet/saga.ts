// This file is just a stub showing a sample Api request saga.
// For more information on Saga see: https://redux-saga.js.org/

import { fork } from 'redux-saga/effects';
import { connectWalletListener } from './sagas/connectWallet.saga';

export default function* walletSaga() {
  yield fork(connectWalletListener)
}
