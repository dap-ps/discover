import { fork, take, call, put, delay } from "redux-saga/effects";
import { ITransaction } from "../types";
import { awaitTxAction, clearAwaitTxAction } from "../actions";
import { TRANSACTION_STATUS } from "utils/constants";
import { getTxStatus } from "domain/App/blockchainContext";

function* WaitForTxSaga(transaction: ITransaction) {
  try {
    let attemptsLeft = 20 // TODO Potentially overkill
    let status = TRANSACTION_STATUS.PENDING
    while (attemptsLeft != 0) {
      console.log("Attempts left", attemptsLeft)
      status = yield call(async () => await getTxStatus(transaction.hash))
      console.log("Awaited", status)
      if (status == TRANSACTION_STATUS.PENDING) {
        attemptsLeft--;
      } else {
        attemptsLeft = 0
      }
    }
    if (status == TRANSACTION_STATUS.FAILURE) {
      yield put(awaitTxAction.failure({
        ...transaction,
        state: TRANSACTION_STATUS.FAILURE
      }))
    } else if (status == TRANSACTION_STATUS.SUCCESS) {
      yield put(awaitTxAction.success({
        ...transaction,
        state: TRANSACTION_STATUS.SUCCESS
      }))

      yield delay(2000)
      yield put(clearAwaitTxAction())
    }
  }
  catch (error) {
    yield put(awaitTxAction.failure({
      ...transaction,
      state: TRANSACTION_STATUS.FAILURE
    }))
  }
}

function* WaitForTxListener() {
  while (true) {
    const transaction: ITransaction = (yield take(awaitTxAction.request)).payload;
    yield fork(WaitForTxSaga, transaction);
  }
}

export function* TransactionSaga() {
  yield fork(WaitForTxListener);
}
