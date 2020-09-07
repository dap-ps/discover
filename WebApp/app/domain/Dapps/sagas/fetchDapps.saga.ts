import { fetchDappsAction } from '../actions';
import { take, put, call, fork } from 'redux-saga/effects';
import { IRawDappMeta, IDapp } from '../types';
import {
  DiscoverGetDAppsCount,
  DiscoverGetDAppsMeta,
  DiscoverHelperGetMeta,
} from '../contracts/Discover.contract';
import { toast } from 'react-toastify';

export function* fetchDappsSaga() {
  try {
    const contractDappsCount: number = yield call(
      async () => await DiscoverGetDAppsCount(),
    );
    const rawDapps: IRawDappMeta[] = yield call(
      async () =>
        await Promise.all([
          ...new Array(contractDappsCount)
            .fill('')
            .map((value, id: number) => DiscoverGetDAppsMeta(id)),
        ]),
    );
    const partialDapps: Partial<IDapp>[] = rawDapps.map(
      (rawDapp: IRawDappMeta) => ({
        id: rawDapp.id,
        available: parseInt(rawDapp.available),
        uploader: rawDapp.developer,
        votes: parseInt(rawDapp.effectiveBalance),
        compressedMetadata: rawDapp.metadata,
      }),
    );

    yield put(
      fetchDappsAction.success([
        ...(yield call(
          async () =>
            await Promise.all([
              ...partialDapps.map((dapp: Partial<IDapp>) =>
                DiscoverHelperGetMeta(dapp),
              ),
            ]),
        )),
      ]),
    );
  } catch (error) {
    console.error(error);
    toast(error.message, {
      type: 'error',
      autoClose: 10000,
      pauseOnHover: true,
    });
    // TODO if error contains connection issue, its Infura related
    // TODO  Network check
    yield put(fetchDappsAction.failure(error));
  }
}

export function* fetchDappsListener() {
  while (true) {
    yield take(fetchDappsAction.request);
    yield fork(fetchDappsSaga);
  }
}
