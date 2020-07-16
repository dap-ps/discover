import { fetchDappsAction } from "../actions";
import { take } from "redux-saga/effects";


export function* fetchDappsSaga() {

}

export function* fetchDappsListener() {
  while (true) {
    yield take(fetchDappsAction.request)

  }
}
