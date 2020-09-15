import { put, delay, fork, select, call } from 'redux-saga/effects';
import { fetchDappsAction } from 'domain/Dapps/actions';
import {
  makeSelectNumberOfDapps,
  makeSelectDappsLastUpdate,
} from 'domain/Dapps/selectors';
import { DiscoverGetDAppsCount } from 'domain/Dapps/contracts/Discover.contract';
import { modifyUnixTimestamp } from 'utils/helpers';
import { getBalancesAction, getPricesAction } from 'domain/Tokens/actions';
import { makeSelectTokensLastUpdate } from 'domain/Tokens/selectors';
import { makeSelectWalletAddress } from 'domain/Wallet/selectors';
import { AddressZero } from 'ethers/constants';
import { makeSelectRequestQueue } from '../selectors';
import { default as DappActionTypes } from 'domain/Dapps/constants';
import { default as TokenActionTypes } from 'domain/Tokens/constants';

function* handleUpdateDapps() {
  const localDappCount = yield select(makeSelectNumberOfDapps);
  const dappsLastUpdate = yield select(makeSelectDappsLastUpdate);
  const requestQueue: string[] = yield select(makeSelectRequestQueue);

  // Checks if a pull is active
  if (requestQueue.indexOf(DappActionTypes.FETCH_DAPPS_REQUEST) < 0) {
    if (dappsLastUpdate == 0 || localDappCount == 0) {
      yield put(fetchDappsAction.request());
    } else {
      if (dappsLastUpdate == 0) {
        yield put(fetchDappsAction.request());
      } else {
        const onchainDappCount = yield call(
          async () => await DiscoverGetDAppsCount(),
        );
        if (localDappCount != onchainDappCount) {
          yield put(fetchDappsAction.request());
        } else if (modifyUnixTimestamp(dappsLastUpdate, 3) < Date.now()) {
          yield put(fetchDappsAction.request());
        }
      }
    }
  }
}

function* handleUpdateTokens() {
  const account = yield select(makeSelectWalletAddress);
  const tokensLastUpdate = yield select(makeSelectTokensLastUpdate);
  const requestQueue: string[] = yield select(makeSelectRequestQueue);

  if (
    requestQueue.indexOf(TokenActionTypes.GET_BALANCES_REQUEST) < 0 &&
    requestQueue.indexOf(TokenActionTypes.GET_PRICES_REQUEST) < 0
  ) {
    if (account != AddressZero) {
      if (tokensLastUpdate == 0) {
        yield put(getBalancesAction.request());
        yield put(getPricesAction.request());
      } else if (modifyUnixTimestamp(tokensLastUpdate, 3) < Date.now()) {
        yield put(getBalancesAction.request());
        yield put(getPricesAction.request());
      }
    }
  }
}

function* DataRefresh() {
  while (true) {
    yield delay(10 * 1000);
    yield fork(handleUpdateDapps);
    yield fork(handleUpdateTokens);
  }
}

export function* BackgroundSaga() {
  yield put(fetchDappsAction.request());
  yield fork(DataRefresh);
}
