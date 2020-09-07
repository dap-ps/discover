import { updateDappDataAction } from '../actions';
import { take, put, call, fork } from 'redux-saga/effects';
import { IRawDappMeta, IDapp } from '../types';
import {
  DiscoverHelperGetMeta,
  DiscoverGetDAppById,
} from '../contracts/Discover.contract';
import { toast } from 'react-toastify';
import { retrieveMetadataApi } from 'api/api';
import { getIpfsHashFromBytes32 } from 'domain/App/sagas/metadata.saga';

export function* updateDappDataSaga(id: string) {
  try {
    const onChainData: IRawDappMeta = yield call(async () => await DiscoverGetDAppById(id))
    let freshDapp = {
      ...(yield call(async () => await DiscoverGetDAppById(id))),
      ...(yield call(async () => await retrieveMetadataApi(getIpfsHashFromBytes32(onChainData.metadata as string))))
    }
    yield put(updateDappDataAction.success(freshDapp));
  } catch (error) {
    console.error(error);
    // TODO if error contains connection issue, its Infura related
    // TODO  Network check
    toast(error.message, {
      type: 'error',
      autoClose: 10000,
      pauseOnHover: true,
    });
    yield put(updateDappDataAction.failure(error));
  }
}

export function* updateDappDataListener() {
  while (true) {
    const id = (yield take(updateDappDataAction.request)).payload;
    yield fork(updateDappDataSaga, id);
  }
}
