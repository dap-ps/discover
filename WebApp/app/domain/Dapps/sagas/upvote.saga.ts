import { take, call, put } from 'redux-saga/effects';
import { updateDappAction, upvoteDappAction } from '../actions';
import { IDappVote, IDapp } from '../types';

function* upvoteSaga(voteData: IDappVote) {
  try {
    console.log(voteData);
    // TODO: Wire up actions
    const updatedDappData: Partial<IDapp> = {}; // MOCK

    yield put(updateDappAction.success(updatedDappData));
  } catch (error) {
    console.error(error);
    yield put(updateDappAction.failure(error));
  }
}

export function* upvoteListener() {
  while (true) {
    const voteData: IDappVote = (yield take(upvoteDappAction.request)).payload;
    yield call(upvoteSaga, voteData);
  }
}
