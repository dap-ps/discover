import { fork } from 'redux-saga/effects';
import { createDappListener } from './sagas/createDapp.saga';
import { updateDappListener } from './sagas/updateDapp.saga';
import { upvoteListener } from './sagas/upvote.saga';
import { downvoteListener } from './sagas/downvote.saga';
import { fetchDappsListener } from './sagas/fetchDapps.saga';

export default function* DappsSaga() {
  yield fork(createDappListener);
  yield fork(updateDappListener);
  yield fork(upvoteListener);
  yield fork(downvoteListener);
  yield fork(fetchDappsListener);
}
