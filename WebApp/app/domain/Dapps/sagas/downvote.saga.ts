import { take, call, put } from 'redux-saga/effects';
import { downvoteDappAction } from '../actions';
import { IDapp } from '../types';
import { toast } from 'react-toastify';

function* downvoteSaga(dappIdentifier: string) {
  try {
    console.log(dappIdentifier);
    // TODO: Wire up actions
    const updatedDappData: Partial<IDapp> = {}; // MOCK

    yield put(downvoteDappAction.success(updatedDappData));
  } catch (error) {
    toast(error.message, {
      type: 'error',
      autoClose: 10000,
      pauseOnHover: true,
    });
    yield put(downvoteDappAction.failure(error));
  }
}

export function* downvoteListener() {
  while (true) {
    const dappIdentifier: string = (yield take(downvoteDappAction.request))
      .payload;
    yield call(downvoteSaga, dappIdentifier);
  }
}
