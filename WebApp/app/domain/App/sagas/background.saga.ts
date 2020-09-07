import { put, delay, fork, select, call } from 'redux-saga/effects';
import { fetchDappsAction } from 'domain/Dapps/actions';
import { makeSelectNumberOfDapps } from 'domain/Dapps/selectors';
import { DiscoverGetDAppsCount } from 'domain/Dapps/contracts/Discover.contract';

function* handleUpdateDapps() {
  const localDappCount = yield select(makeSelectNumberOfDapps)
  const onchainDappCount = yield call(async () => await DiscoverGetDAppsCount())
  if (localDappCount != onchainDappCount) {
    yield put(fetchDappsAction.request());
  }
}

function* DataRefresh() {
  while (true) {
    console.log('delay');
    yield delay(10 * 1000);
    console.log('post delay');
    yield fork(handleUpdateDapps)
  }
}

export function* BackgroundSaga() {
  console.log('starting');
  yield put(fetchDappsAction.request());
  yield fork(DataRefresh)
}
