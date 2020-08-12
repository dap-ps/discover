import { connectAccountAction } from '../actions';
import { take, put, call, fork } from 'redux-saga/effects';
import { getAccount } from '../blockchainContext';

function* ConnectAccountSaga() {
  try {
    const account: string = yield call(async () => await getAccount());
    yield put(connectAccountAction.success(account));
  } catch (error) {
    yield put(connectAccountAction.failure(error));
  }
}

function* ConnectAccountListener() {
  while (true) {
    yield take(connectAccountAction.request);
    yield call(ConnectAccountSaga);
  }
}

export function* AccountSaga() {
  yield fork(ConnectAccountListener);
}
