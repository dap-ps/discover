import { updateDappDataAction } from '../actions';
import { take, put, call, fork } from 'redux-saga/effects';
import { IRawDappMeta, IDapp } from '../types';
import {
  DiscoverHelperGetMeta,
  DiscoverGetDAppById,
} from '../contracts/Discover.contract';

export function* updateDappDataSaga(id: string) {
  try {
    const rawDapp: IRawDappMeta = yield call(
      async () => await DiscoverGetDAppById(id)
    )
    const dapp: IDapp = yield call(async () => await DiscoverHelperGetMeta({
      id: rawDapp.id,
      available: parseInt(rawDapp.available),
      uploader: rawDapp.developer,
      votes: parseInt(rawDapp.effectiveBalance),
      compressedMetadata: rawDapp.metadata,
    }))
    yield put(updateDappDataAction.success(dapp))
  } catch (error) {
    debugger;
    // TODO if error contains connection issue, its Infura related
    // TODO  Network check
    yield put(updateDappDataAction.failure(error));
  }
}

export function* updateDappDataListener() {
  while (true) {
    const id = (yield take(updateDappDataAction.request)).payload;
    yield fork(updateDappDataSaga, id);
  }
}
