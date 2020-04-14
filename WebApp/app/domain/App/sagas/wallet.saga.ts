import { take, call, put, fork } from "redux-saga/effects";
import { connectWalletAction, setConnectedStateAction } from "../actions";
import EmbarkJS from "embarkArtifacts/embarkjs";

function* connectWalletSaga() {
  const derp = yield call(async () => await EmbarkJS.enableEthereum())
  console.log(derp);

  debugger;
  yield put(setConnectedStateAction(true))
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
