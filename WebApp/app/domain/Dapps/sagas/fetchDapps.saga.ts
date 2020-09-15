import { fetchDappsAction } from '../actions';
import { take, put, call, fork } from 'redux-saga/effects';
import { IRawDappMeta, IDapp, ICachedDapp } from '../types';
import {
  DiscoverGetDAppsCount,
  DiscoverGetDAppsMeta,
  DiscoverICachedDappToIDapp,
  DiscoverIRawDappMetaToIDapp,
} from '../contracts/Discover.contract';
import { retrieveAllDappsMetadataApi } from 'api/api';
import { getIpfsHashFromBytes32 } from 'domain/App/sagas/metadata.saga';

export function* fetchDappsSaga() {
  try {
    const contractDappsCount: number = yield call(
      async () => await DiscoverGetDAppsCount(),
    );

    const fetchedMeta: {
      [hash: string]: ICachedDapp;
    } = yield call(async () => (await retrieveAllDappsMetadataApi()).data);

    const rawDapps: IRawDappMeta[] = yield call(
      async () =>
        await Promise.all([
          ...new Array(contractDappsCount)
            .fill('')
            .map((value, id: number) => DiscoverGetDAppsMeta(id)),
        ]),
    );

    const dapps: Partial<IDapp>[] = rawDapps.map((rawDapp: IRawDappMeta) => {
      const onChainData: ICachedDapp | undefined =
        fetchedMeta[getIpfsHashFromBytes32(rawDapp.metadata)];
      return {
        ...(onChainData && DiscoverICachedDappToIDapp(onChainData)),
        ...DiscoverIRawDappMetaToIDapp(rawDapp),
      };
    });

    yield put(fetchDappsAction.success(dapps as IDapp[]));
  } catch (error) {
    console.error(error);
    // toast(error.message, {
    //   type: 'error',
    //   autoClose: 10000,
    //   pauseOnHover: true,
    // });
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
