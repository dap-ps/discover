import { fork, take, call, put, delay } from 'redux-saga/effects';
import { ITransaction } from '../types';
import { awaitTxAction, clearAwaitTxAction } from '../actions';
import { TRANSACTION_STATUS } from 'utils/constants';
import { getTxStatus } from 'domain/App/blockchainUtils';
import { toast } from 'react-toastify';

function* WaitForTxSaga(transaction: ITransaction) {
  try {
    let attemptsLeft = 20; // TODO Potentially overkill
    let status = TRANSACTION_STATUS.PENDING;
    while (attemptsLeft != 0) {
      try {
        status = yield call(async () => await getTxStatus(transaction.hash));
      } catch (error) {}
      if (status == TRANSACTION_STATUS.PENDING) {
        yield delay(3000);
        attemptsLeft--;
      } else {
        attemptsLeft = 0;
      }
    }
    if (status == TRANSACTION_STATUS.FAILURE) {
      yield put(
        awaitTxAction.success({
          ...transaction,
          state: TRANSACTION_STATUS.FAILURE,
        }),
      );
    } else if (status == TRANSACTION_STATUS.SUCCESS) {
      yield put(
        awaitTxAction.success({
          ...transaction,
          state: TRANSACTION_STATUS.SUCCESS,
        }),
      );

      yield delay(10000);
      yield put(clearAwaitTxAction());
    }
  } catch (error) {
    toast(error.message, {
      type: 'error',
      autoClose: 10000,
      pauseOnHover: true,
    });
    yield put(clearAwaitTxAction());
    yield put(awaitTxAction.failure(error));
  }
}

function* WaitForTxListener() {
  while (true) {
    const transaction: ITransaction = (yield take(awaitTxAction.request))
      .payload;
    yield fork(WaitForTxSaga, transaction);
  }
}

export function* TransactionSaga() {
  yield fork(WaitForTxListener);
}
