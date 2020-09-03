import { take, call, put, select, race } from 'redux-saga/effects';
import { createDappAction, setDappsLoadingAction } from '../actions';
import { IDapp } from '../types';
import { defaultMultiplier, web3Keccak } from 'domain/App/blockchainContext';
import { uploadMetadataApi, requestApprovalApi } from 'api/api';
import { validateDAppCreation, DiscoverCreateDApp } from '../contracts/Discover.contract';
import { AddressZero } from 'ethers/constants';
import { getBytes32FromIpfsHash } from 'domain/App/sagas/metadata.saga';
import { ROUTE_LINKS } from 'routeLinks';
import { forwardTo } from 'utils/history';
import { TRANSACTION_STATUS } from 'utils/constants';
import { connectAccountAction, awaitTxAction, clearAwaitTxAction } from 'domain/Wallet/actions';
import { selectWalletAddress } from 'domain/Wallet/selectors';

function* createDappSaga(dapp: IDapp) {
  try {
    yield put(setDappsLoadingAction(true))
    let account = yield select(selectWalletAddress)
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
        account = yield select(selectWalletAddress)
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
      const createdTx = yield call(async () => await DiscoverCreateDApp(dapp.id, tokenAmount, getBytes32FromIpfsHash(uploadedMetadata.data.hash)))
      yield call(async () => await requestApprovalApi(uploadedMetadata.data.hash))
      forwardTo(ROUTE_LINKS.Home)
      yield put(awaitTxAction.request({
        iconSrc: dapp.icon,
        hash: createdTx,
        state: TRANSACTION_STATUS.PENDING,
        heading: dapp.name,
        caption: dapp.desc,
      }))
      // TODO: reroute to vote module after wait is completed
      yield put(createDappAction.success(dapp));
      const {
        success,
      } = yield race({
        success: take(awaitTxAction.success),
        failure: take(awaitTxAction.failure),
      })
      if (success) { 
        forwardTo(ROUTE_LINKS.Vote(dapp.id, "upvote"))
      }
      yield put(setDappsLoadingAction(false))
      
    } else {
      yield call(async () => await requestApprovalApi(uploadedMetadata.data.hash))
      yield put(createDappAction.success(dapp));
      // TODO Does this work?
      forwardTo(ROUTE_LINKS.Vote(dapp.id, "upvote"))
      yield put(setDappsLoadingAction(false))
    }
   
  } catch (error) {
    console.error(error);
    yield put(clearAwaitTxAction())
    yield put(createDappAction.failure(error));
    yield put(setDappsLoadingAction(false))
  }
}

export function* createDappListener() {
  while (true) {
    const dapp: IDapp = (yield take(createDappAction.request)).payload;
    yield call(createDappSaga, dapp);
  }
}
