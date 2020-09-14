import { take, call, put, race, delay } from 'redux-saga/effects';
import {
  downvoteDappAction,
  setDappsLoadingAction,
  updateDappDataAction,
} from '../actions';
import { IDappVote } from '../types';
import { toast } from 'react-toastify';
import { DiscoverDownVote } from '../contracts/Discover.contract';
import { awaitTxAction } from 'domain/Wallet/actions';
import { TRANSACTION_STATUS } from 'utils/constants';
import { generateUri } from 'api/apiUrlBuilder';

function* downvoteSaga(voteData: IDappVote) {
  try {
    yield put(setDappsLoadingAction(true));

    let attempts = 10;
    let downVoteTx;
    let error;
    while (attempts > 0) {
      try {
        downVoteTx = yield call(
          async () => await DiscoverDownVote(voteData.id),
        );
        attempts = 0;
      } catch (caughtError) {
        error = caughtError;
      }
      yield delay(250);
      attempts--;
    }

    if (!downVoteTx) {
      throw error;
    }

    yield put(
      awaitTxAction.request({
        iconSrc: voteData.icon.includes('base64')
          ? voteData.icon
          : generateUri(voteData.icon),
        hash: downVoteTx,
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
      yield put(downvoteDappAction.success());
      yield put(setDappsLoadingAction(false));
      yield put(updateDappDataAction.request(voteData.id));
    } else {
      throw failure;
    }
  } catch (error) {
    yield put(setDappsLoadingAction(false));
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
    const voteData: IDappVote = (yield take(downvoteDappAction.request))
      .payload;
    yield call(downvoteSaga, voteData);
  }
}
