import { take, call, put, select, race } from 'redux-saga/effects';
import { createDappAction } from '../actions';
import { IDapp } from '../types';
import { selectCurrentAccount } from 'domain/App/selectors';
import { defaultMultiplier, web3Keccak } from 'domain/App/blockchainContext';
import { uploadMetadataApi, requestApprovalApi } from 'api/api';
import { validateDAppCreation, DiscoverCreateDApp } from '../contracts/Discover.contract';
import { AddressZero } from 'ethers/constants';
import { connectAccountAction } from 'domain/App/actions';
import { getBytes32FromIpfsHash } from 'domain/App/sagas/metadata.saga';

function* createDappSaga(dapp: IDapp) {
  try {
    let account = yield select(selectCurrentAccount)
    if(dapp.sntValue > 0) {
      if (account == AddressZero) {
        yield put(connectAccountAction.request())
        const {
          failure
        } = yield race({
          success: take(connectAccountAction.success),
          failure: take(connectAccountAction.failure)
        })
        if(failure){
          throw 'Account required'
        }
        account = yield select(selectCurrentAccount)
      }
    }
    
    const dappMetadata = {
      name: dapp.name,
      url: dapp.url,
      description: dapp.desc,
      category: dapp.category,
      image: dapp.icon,
      dateAdded: Date.now(),
      uploader: account
    }

    dapp.id = web3Keccak(JSON.stringify(dappMetadata))
    const tokenAmount = defaultMultiplier.mul(dapp.sntValue)

    yield call(async () => await validateDAppCreation(dapp.id, tokenAmount))
    
    // Store in DB
    const uploadedMetadata = yield call(async () => await uploadMetadataApi(dappMetadata, dapp.email))
    
    // Check if publishing should happen
    // This value was set in the last step of the creation form
    if (dapp.sntValue > 0) {
      debugger
      const createdTx = yield call(async () => await DiscoverCreateDApp(dapp.id, tokenAmount, getBytes32FromIpfsHash(uploadedMetadata.data.hash)))
      debugger
      yield call(async () => await requestApprovalApi(uploadedMetadata.data.hash))
      yield put(createDappAction.success(dapp));
      console.log(createdTx)
      // Check status or change page based on TX & ID
    } else {
      yield call(async () => await requestApprovalApi(uploadedMetadata.data.hash))
      yield put(createDappAction.success(dapp));

      // Check status or change page based on TX & ID
    }

   
  } catch (error) {
    console.error(error);
    yield put(createDappAction.failure(error));
  }
}

export function* createDappListener() {
  while (true) {
    const dapp: IDapp = (yield take(createDappAction.request)).payload;
    yield call(createDappSaga, dapp);
  }
}
