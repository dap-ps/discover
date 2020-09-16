import { fork, put } from 'redux-saga/effects';
import { createDappListener } from './sagas/createDapp.saga';
import { updateDappListener } from './sagas/updateDapp.saga';
import { upvoteListener } from './sagas/upvote.saga';
import { downvoteListener } from './sagas/downvote.saga';
import { fetchDappsListener } from './sagas/fetchDapps.saga';
import { withdrawListener } from './sagas/withdraw.saga';
import { updateDappDataListener } from './sagas/updateDappData.saga';
import { setDappsLoadingAction } from './actions';

export default function* DappsSaga() {
  yield fork(createDappListener);
  yield fork(updateDappListener);
  yield fork(upvoteListener);
  yield fork(downvoteListener);
  yield fork(updateDappDataListener);
  yield fork(fetchDappsListener);
  yield fork(withdrawListener);
  yield put(setDappsLoadingAction(false))
}
