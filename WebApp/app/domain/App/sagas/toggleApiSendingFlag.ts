import { setApiSendingFlag, setErrorMessageAction } from "../actions";
import { put, race, take, takeLatest } from "redux-saga/effects";

function* toggleApiSendingFlag(action) {
  try {
    yield put(setApiSendingFlag(true));
    const {failure} = yield race({
      success: take(action.type.replace('_REQUEST', '_SUCCESS')),
      failure: take(action.type.replace('_REQUEST', '_FAILURE'))
    })
    if(failure){
      yield put(setErrorMessageAction(failure.payload))
    }
  } catch (error) {
  } finally {
    yield put(setApiSendingFlag(false));
  }
}

export function* apiRequestListener() {
  yield takeLatest(action => (action.type.endsWith('_REQUEST')), toggleApiSendingFlag);
}
