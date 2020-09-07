import { take, call, put, race } from 'redux-saga/effects';
import { upvoteDappAction, setDappsLoadingAction, updateDappDataAction } from '../actions';
import { IDappVote } from '../types';
import { toast } from 'react-toastify';
import { validateUpVoting, DiscoverUpVote } from '../contracts/Discover.contract';
import { awaitTxAction } from 'domain/Wallet/actions';
import { TRANSACTION_STATUS } from 'utils/constants';

function* upvoteSaga(voteData: IDappVote) {
  try {
    // TODO: Wire up actions
    yield put(setDappsLoadingAction(true));
    yield call(async () => await validateUpVoting(voteData.id, voteData.amount))

    const upvoteTx = yield call(async () => await DiscoverUpVote(voteData.id, voteData.amount))
    yield put(
      awaitTxAction.request({
        iconSrc: voteData.icon,
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
      debugger;
      throw failure;
    }
  } catch (error) {
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
