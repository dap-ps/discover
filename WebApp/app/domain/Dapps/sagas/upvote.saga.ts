import { take, call, put } from 'redux-saga/effects';
import { updateDappAction, upvoteDappAction } from '../actions';
import { IDappVote, IDapp } from '../types';
import { toast } from 'react-toastify';

function* upvoteSaga(voteData: IDappVote) {
  try {
    console.log(voteData);
    // TODO: Wire up actions
    const updatedDappData: Partial<IDapp> = {}; // MOCK

    yield put(updateDappAction.success(updatedDappData));
  } catch (error) {
    toast(error.message, {
      type: 'error',
      autoClose: 10000,
      pauseOnHover: true,
    });
    yield put(updateDappAction.failure(error));
  }
}

export function* upvoteListener() {
  while (true) {
    const voteData: IDappVote = (yield take(upvoteDappAction.request)).payload;
    yield call(upvoteSaga, voteData);
  }
}
