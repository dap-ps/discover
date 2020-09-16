import { take, call, put, select, race, delay } from 'redux-saga/effects';
import {
  createDappAction,
  setDappsLoadingAction,
  updateDappDataAction,
} from '../actions';
import { IDapp } from '../types';
import { defaultMultiplier, web3Keccak } from 'domain/App/blockchainUtils';
import { uploadMetadataApi, requestApprovalApi } from 'api/api';
import {
  validateDAppCreation,
  DiscoverCreateDApp,
} from '../contracts/Discover.contract';
import { AddressZero } from 'ethers/constants';
import { getBytes32FromIpfsHash } from 'domain/App/sagas/metadata.saga';
import { TRANSACTION_STATUS } from 'utils/constants';
import {
  connectAccountAction,
  awaitTxAction,
  clearAwaitTxAction,
} from 'domain/Wallet/actions';
import { selectWalletAddress } from 'domain/Wallet/selectors';
import { toast } from 'react-toastify';

function* createDappSaga(dapp: IDapp) {
  try {
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

    dapp.id = web3Keccak(JSON.stringify(dappMetadata));
    const tokenAmount = defaultMultiplier.mul(dapp.sntValue as number);

    yield call(async () => await validateDAppCreation(dapp.id, tokenAmount));

    // Store in DB
    let attempts = 10;
    let uploadedMetadata;
    let error;

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
      throw error;
    }
    attempts = 10;
    // Check if publishing should happen
    // This value was set in the last step of the creation form
    if ((dapp.sntValue as number) > 0) {
      let createdTx;
      while (attempts > 0) {
        try {
          createdTx = yield call(
            async () =>
              await DiscoverCreateDApp(
                dapp.id,
                tokenAmount,
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

      if (!createdTx) {
        throw error;
      }

      yield call(
        async () => await requestApprovalApi(uploadedMetadata.data.hash),
      );
      yield put(
        awaitTxAction.request({
          iconSrc: dapp.icon,
          hash: createdTx,
          state: TRANSACTION_STATUS.PENDING,
          heading: dapp.name,
          caption: dapp.desc,
        }),
      );
      const { success, failure } = yield race({
        success: take(awaitTxAction.success),
        failure: take(awaitTxAction.failure),
      });
      if (success) {
        yield put(createDappAction.success(dapp));
        yield put(setDappsLoadingAction(false));
        yield put(updateDappDataAction.request(dapp.id));
      } else {
        throw failure;
      }
    } else {
      yield call(
        async () => await requestApprovalApi(uploadedMetadata.data.hash),
      );
      yield put(createDappAction.success(dapp));
      // TODO Does this work?
      yield put(setDappsLoadingAction(false));
    }
  } catch (error) {
    // TODO Fire toaster error
    console.error(error);
    yield put(clearAwaitTxAction());
    yield put(createDappAction.failure(error));
    yield put(setDappsLoadingAction(false));
    toast(error.message, {
      type: 'error',
      autoClose: 10000,
      pauseOnHover: true,
    });
  }
}

export function* createDappListener() {
  while (true) {
    const dapp: IDapp = (yield take(createDappAction.request)).payload;
    yield call(createDappSaga, dapp);
  }
}
