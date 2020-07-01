import { fork, put } from 'redux-saga/effects';

import { setApiSendingFlag } from './actions';

import { apiRequestListener } from './sagas/toggleApiSendingFlag';
import { errorMessageHandler } from './sagas/errorMessageHandler';
import DappsSaga from 'domain/Dapps/saga';
import TokensSaga from 'domain/Tokens/saga';
import walletSaga from 'domain/Wallet/saga';

export default function* rootDaemonSaga() {
  yield put(setApiSendingFlag(false));
  yield fork(apiRequestListener);

  // Add other global DAEMON sagas here.
  // To prevent performance bottlenecks add sagas with caution.
  yield fork(errorMessageHandler);

  // Domain Sagas
  yield fork(DappsSaga);
  yield fork(TokensSaga);
  yield fork(walletSaga);

  // App domain internal saga's
}
