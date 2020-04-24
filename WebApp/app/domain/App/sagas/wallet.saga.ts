import { take, call, put, fork } from "redux-saga/effects";
import { connectWalletAction, setWalletAction } from "../actions";
import EmbarkJS from "embarkArtifacts/embarkjs";
import { getBalancesAction } from "domain/Tokens/actions";
import { constants } from 'ethers';

function* connectWalletSaga() {
  const addresses: string[] = yield call(async () => await EmbarkJS.enableEthereum())
  if(addresses.length > 0){
    yield put(setWalletAction(addresses[0]))
    // TODO set network
    yield put(getBalancesAction.request())
  }else{
    // TODO pull from utils
    yield put(setWalletAction(constants.AddressZero))
  }
}

function* connectWalletListener(){
  while(true){
    yield take(connectWalletAction);
    yield call(connectWalletSaga);
  }
}

export function* WalletSaga(){
  yield fork(connectWalletListener)

  // Init
  yield put(connectWalletAction())
}
