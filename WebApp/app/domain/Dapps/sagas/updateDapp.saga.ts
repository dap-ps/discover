import { take, call, put, select, race } from 'redux-saga/effects';
import { updateDappAction, setDappsLoadingAction } from '../actions';
import { IDapp } from '../types';
import { toast } from 'react-toastify';
import { connectAccountAction, awaitTxAction } from 'domain/Wallet/actions';
import { AddressZero } from 'ethers/constants';
import { selectWalletAddress } from 'domain/Wallet/selectors';
import { validateMetadataSet, DiscoverSetMetadata } from '../contracts/Discover.contract';
import { uploadMetadataApi, updateDappApi } from 'api/api';
import { getBytes32FromIpfsHash } from 'domain/App/sagas/metadata.saga';
import { TRANSACTION_STATUS } from 'utils/constants';

function* updateDappSaga(dapp: IDapp) {
  try {
    // TODO: Wire up actions
    yield put(setDappsLoadingAction(true));
    let account = yield select(selectWalletAddress);
    if ((dapp.sntValue as number) > 0) {
      if (account == AddressZero) {
        yield put(connectAccountAction.request());
        const { success, failure } = yield race({
          success: take(connectAccountAction.success),
          failure: take(connectAccountAction.failure),
        });
        if (failure) {
          throw 'Account required';
        }
        account = success.payload;
      }
    }

    const dappMetadata = {
      name: dapp.name,
      url: dapp.url,
      description: dapp.desc,
      category: dapp.category,
      image: dapp.icon,
      dateAdded: Date.now(),
      uploader: account,
    };
    yield call(async () => await validateMetadataSet(dapp.id));
    
    const uploadedMetadata = yield call(
      async () => await uploadMetadataApi(dappMetadata, dapp.email),
    )

    const updateMetaTx = yield call(
      async () =>
        await DiscoverSetMetadata(
          dapp.id,
          getBytes32FromIpfsHash(uploadedMetadata.data.hash)
        ),
    )

    yield put(
      awaitTxAction.request({
        iconSrc: dapp.icon,
        hash: updateMetaTx,
        state: TRANSACTION_STATUS.PENDING,
        heading: dapp.name,
        caption: dapp.desc,
      }),
    )

    yield call(
      async () => await updateDappApi(dapp.id, dapp.email),
    )
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
