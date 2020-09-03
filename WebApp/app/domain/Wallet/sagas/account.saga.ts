import { take, put, call, fork } from 'redux-saga/effects';
import { connectAccountAction } from '../actions';
import { getAccount, getNetworkId } from 'domain/App/blockchainContext';
import { setNetworkAction } from 'domain/App/actions';

function* ConnectAccountSaga() {
  try {
    const account: string = yield call(async () => await getAccount());
    const network: number = yield call(async () => await getNetworkId());
    yield put(setNetworkAction(network));
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
