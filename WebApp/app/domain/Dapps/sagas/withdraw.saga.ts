import { take, call, put, race, delay } from 'redux-saga/effects';
import {
  updateDappAction,
  setDappsLoadingAction,
  withdrawAction,
  updateDappDataAction,
} from '../actions';
import { IWithdrawRequest } from '../types';
import { toast } from 'react-toastify';
import { awaitTxAction } from 'domain/Wallet/actions';
import { TRANSACTION_STATUS } from 'utils/constants';
import { DiscoverWithdraw } from '../contracts/Discover.contract';
import { generateUri } from 'api/apiUrlBuilder';

function* withdrawSaga(withdrawRequest: IWithdrawRequest) {
  try {
    yield put(setDappsLoadingAction(true));

    let attempts = 10;
    let withdrawTx;
    let error;
    while (attempts > 0) {
      try {
        withdrawTx = yield call(
          async () =>
            await DiscoverWithdraw(withdrawRequest.id, withdrawRequest.amount),
        );
        attempts = 0;
      } catch (caughtError) {
        error = caughtError;
      }
      yield delay(250);
      attempts--;
    }

    if (!withdrawTx) {
      throw error;
    }

    yield put(
      awaitTxAction.request({
        iconSrc: withdrawRequest.icon.includes('base64')
          ? withdrawRequest.icon
          : generateUri(withdrawRequest.icon),
        hash: withdrawTx,
        state: TRANSACTION_STATUS.PENDING,
        heading: withdrawRequest.name,
        caption: withdrawRequest.desc,
      }),
    );

    const { success, failure } = yield race({
      success: take(awaitTxAction.success),
      failure: take(awaitTxAction.failure),
    });

    if (success) {
      yield put(updateDappDataAction.request(withdrawRequest.id));

      const { updateSuccess, updateFailure } = yield race({
        updateSuccess: take(updateDappDataAction.success),
        failure: take(updateDappDataAction.failure),
      });
      if (updateSuccess) {
        yield put(withdrawAction.success());
        yield put(setDappsLoadingAction(false));
      } else {
        throw updateFailure;
      }
    } else {
      throw failure;
    }
  } catch (error) {
    toast(error.message, {
      type: 'error',
      autoClose: 10000,
      pauseOnHover: true,
    });
    yield put(setDappsLoadingAction(false));
    yield put(updateDappAction.failure(error));
  }
}

export function* withdrawListener() {
  while (true) {
    const withdrawRequest: IWithdrawRequest = (yield take(
      withdrawAction.request,
    )).payload;
    yield call(withdrawSaga, withdrawRequest);
  }
}
