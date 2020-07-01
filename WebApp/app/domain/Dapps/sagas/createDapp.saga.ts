import { take, call, put } from 'redux-saga/effects';
import { createDappAction } from '../actions';
import { IDapp } from '../types';

function* createDappSaga(dapp: IDapp) {
  try {
    // TODO: Wire up actions
    yield put(createDappAction.success(dapp));
  } catch (error) {
    console.error(error);
    yield put(createDappAction.failure(error));
  }
}

export function* createDappListener() {
  while (true) {
    const dapp: IDapp = (yield take(createDappAction.request)).payload;
    yield call(createDappSaga, dapp);
  }
}
