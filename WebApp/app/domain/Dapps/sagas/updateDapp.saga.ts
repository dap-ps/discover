import { take, call, put, select, race, delay } from 'redux-saga/effects';
import { updateDappAction, setDappsLoadingAction } from '../actions';
import { IDapp } from '../types';
import { toast } from 'react-toastify';
import { connectAccountAction, awaitTxAction } from 'domain/Wallet/actions';
import { AddressZero } from 'ethers/constants';
import { selectWalletAddress } from 'domain/Wallet/selectors';
import {
  validateMetadataSet,
  DiscoverSetMetadata,
  DiscoverDappExists,
} from '../contracts/Discover.contract';
import { uploadMetadataApi, updateDappApi } from 'api/api';
import { getBytes32FromIpfsHash } from 'domain/App/sagas/metadata.saga';
import { TRANSACTION_STATUS } from 'utils/constants';
import { getBase64Image } from 'utils/helpers';

function* updateDappSaga(dapp: IDapp) {
  try {
    yield put(setDappsLoadingAction(true));
    let account = yield select(selectWalletAddress);
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

    const iconUrl =
      dapp.icon.indexOf('base64') < 0
        ? yield call(async () => await getBase64Image(dapp.icon))
        : dapp.icon;
    const dappMetadata = {
      name: dapp.name,
      url: dapp.url,
      description: dapp.desc,
      category: dapp.category,
      image: iconUrl,
      dateAdded: Date.now(),
      uploader: account,
    };

    const existsOnChain = yield call(
      async () => await DiscoverDappExists(dapp.id),
    );

    if (existsOnChain) {
      yield call(async () => await validateMetadataSet(dapp.id));
      let attempts = 10;
      let error;
      let uploadedMetadata;
      while (attempts > 0) {
        try {
          uploadedMetadata = yield call(
            async () => await uploadMetadataApi(dappMetadata, dapp.email),
          );
          attempts = 0;
        } catch (caughtError) {
          error = caughtError;
        }
        yield delay(250);
        attempts--;
      }

      if (!uploadedMetadata) {
        throw 'Upload error';
      }

      attempts = 10;
      let updateMetaTx;
      while (attempts > 0) {
        try {
          updateMetaTx = yield call(
            async () =>
              await DiscoverSetMetadata(
                dapp.id,
                getBytes32FromIpfsHash(uploadedMetadata.data.hash),
              ),
          );
          attempts = 0;
        } catch (caughtError) {
          error = caughtError;
        }
        yield delay(250);
        attempts--;
      }

      if (!uploadedMetadata) {
        throw error;
      }

      yield put(
        awaitTxAction.request({
          iconSrc: dapp.icon,
          hash: updateMetaTx,
          state: TRANSACTION_STATUS.PENDING,
          heading: dapp.name,
          caption: dapp.desc,
        }),
      );
    }

    yield call(async () => await updateDappApi(dapp.id, dapp.email));
    yield put(updateDappAction.success(dapp));
    yield put(setDappsLoadingAction(false));
  } catch (error) {
    toast(error.message, {
      type: 'error',
      autoClose: 10000,
      pauseOnHover: true,
    });
    yield put(setDappsLoadingAction(false));
    yield put(updateDappAction.failure(error));
  }
}

export function* updateDappListener() {
  while (true) {
    const dapp: IDapp = (yield take(updateDappAction.request)).payload;
    yield call(updateDappSaga, dapp);
  }
}
