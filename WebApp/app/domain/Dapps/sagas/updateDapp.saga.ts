import { take, call, put } from 'redux-saga/effects';
import { updateDappAction } from '../actions';
import { IDapp } from '../types';
import { toast } from 'react-toastify';

function* updateDappSaga(dapp: IDapp) {
  try {
    // TODO: Wire up actions
    yield put(updateDappAction.success(dapp));
  } catch (error) {
    toast(error.message, {
      type: 'error',
      autoClose: 10000,
      pauseOnHover: true,
    });
    yield put(updateDappAction.failure(error));
  }
}

export function* updateDappListener() {
  while (true) {
    const dapp: IDapp = (yield take(updateDappAction.request)).payload;
    yield call(updateDappSaga, dapp);
  }
}
