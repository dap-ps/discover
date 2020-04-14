import { take, call, put, fork } from "redux-saga/effects";
import { connectWalletAction, setConnectedStateAction } from "../actions";
import EmbarkJS from "embarkArtifacts/embarkjs";

function* connectWalletSaga() {
  const addresses: string[] = yield call(async () => await EmbarkJS.enableEthereum())
  if(addresses.length > 0){
    yield put(setConnectedStateAction(true))
  }else{
    yield put(setConnectedStateAction(false))
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
