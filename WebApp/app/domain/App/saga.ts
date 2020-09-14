import { fork, put } from 'redux-saga/effects';

import { setLoadingAction, clearRequestQueueAction } from './actions';

import { apiRequestListener } from './sagas/toggleApiSendingFlag';
import DappsSaga from 'domain/Dapps/saga';
import TokensSaga from 'domain/Tokens/saga';
import walletSaga from 'domain/Wallet/saga';
import { BackgroundSaga } from './sagas/background.saga';

export default function* rootDaemonSaga() {
  yield put(setLoadingAction(false));
  yield put(clearRequestQueueAction());
  yield fork(apiRequestListener);

  // Add other global DAEMON sagas here.
  // To prevent performance bottlenecks add sagas with caution.

  // Domain Sagas
  yield fork(DappsSaga);
  yield fork(TokensSaga);
  yield fork(walletSaga);

  // App domain internal saga's
  yield fork(BackgroundSaga);
}
