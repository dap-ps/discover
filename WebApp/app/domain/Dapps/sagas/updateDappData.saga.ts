import { updateDappDataAction } from '../actions';
import { take, put, call, fork } from 'redux-saga/effects';
import { IDapp, ICachedDapp } from '../types';
import {
  DiscoverGetDAppById,
  DiscoverICachedDappToIDapp,
  DiscoverIRawDappMetaToIDapp,
} from '../contracts/Discover.contract';
import { toast } from 'react-toastify';
import { retrieveMetadataApi } from 'api/api';
import { getIpfsHashFromBytes32 } from 'domain/App/sagas/metadata.saga';

export function* updateDappDataSaga(id: string) {
  try {
    const onChainData: Partial<IDapp> = DiscoverIRawDappMetaToIDapp(
      yield call(async () => await DiscoverGetDAppById(id)),
    );

    const metaData: ICachedDapp = (yield call(
      async () =>
        await retrieveMetadataApi(
          getIpfsHashFromBytes32(onChainData.compressedMetadata as string),
        ),
    )).data;
    let freshDapp: Partial<IDapp> = {
      ...DiscoverICachedDappToIDapp(metaData),
      ...onChainData,
    };
    
    yield put(updateDappDataAction.success(freshDapp as IDapp));
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
