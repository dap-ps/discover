import { delay, put, fork } from 'redux-saga/effects';
import { fetchDappsAction } from 'domain/Dapps/actions';

function* DataRefresh() {
  console.log('in looper');

  while (true) {
    console.log('delay');
    yield delay(30 * 1000);
    console.log('post delay');
    yield put(fetchDappsAction.request());
  }
}

export function* BackgroundSaga() {
  console.log('starting');
  yield put(fetchDappsAction.request());

  // yield fork(DataRefresh)
}
