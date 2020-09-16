import { take, call, put, race, delay } from 'redux-saga/effects';
import {
  upvoteDappAction,
  setDappsLoadingAction,
  updateDappDataAction,
} from '../actions';
import { IDappVote } from '../types';
import { toast } from 'react-toastify';
import {
  validateUpVoting,
  DiscoverUpVote,
} from '../contracts/Discover.contract';
import { awaitTxAction } from 'domain/Wallet/actions';
import { TRANSACTION_STATUS } from 'utils/constants';
import { generateUri } from 'api/apiUrlBuilder';

function* upvoteSaga(voteData: IDappVote) {
  try {
    yield put(setDappsLoadingAction(true));
    let attempts = 10;
    let upvoteTx;
    let error;
    while (attempts > 0) {
      try {
        yield call(
          async () =>
            await validateUpVoting(voteData.id, voteData.amount as number),
        );
        upvoteTx = yield call(
          async () =>
            await DiscoverUpVote(voteData.id, voteData.amount as number),
        );
        attempts = 0;
      } catch (caughtError) {
        error = caughtError;
      }

      yield delay(250);
      attempts--;
    }
    if (!upvoteTx) {
      throw error;
    }
    yield put(
      awaitTxAction.request({
        iconSrc: voteData.icon.includes('base64')
          ? voteData.icon
          : generateUri(voteData.icon),
        hash: upvoteTx,
        state: TRANSACTION_STATUS.PENDING,
        heading: voteData.name,
        caption: voteData.desc,
      }),
    );
    const { success, failure } = yield race({
      success: take(awaitTxAction.success),
      failure: take(awaitTxAction.failure),
    });
    if (success) {
      yield put(upvoteDappAction.success());
      yield put(setDappsLoadingAction(false));
      yield put(updateDappDataAction.request(voteData.id));
    } else {
      throw failure;
    }
  } catch (error) {
    console.error(error);
    toast(error.message, {
      type: 'error',
      autoClose: 10000,
      pauseOnHover: true,
    });
    yield put(setDappsLoadingAction(false));
    yield put(upvoteDappAction.failure(error));
  }
}

export function* upvoteListener() {
  while (true) {
    const voteData: IDappVote = (yield take(upvoteDappAction.request)).payload;
    yield call(upvoteSaga, voteData);
  }
}
