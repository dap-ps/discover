import {
  setActiveErrorCodeAction,
  addToRequestQueueAction,
  removeFromRequestQueueAction,
} from '../actions'
import { put, take, fork, takeLatest } from 'redux-saga/effects'
import { ERROR_CODES } from 'utils/constants'

// Redux dev tools not injecting in extension, this is a work around
function* logger() {
  yield takeLatest((action) => action != false, console.log)
}

function* parseAction(actionType: string) {
  if (actionType.endsWith('_REQUEST')) {
    yield put(addToRequestQueueAction(actionType))
    yield put(setActiveErrorCodeAction(ERROR_CODES.Void))
  } else if (actionType.endsWith('_SUCCESS')) {
    yield put(
      removeFromRequestQueueAction(actionType.replace('_SUCCESS', '_REQUEST'))
    )
  } else if (actionType.endsWith('_FAILURE')) {
    yield put(
      removeFromRequestQueueAction(actionType.replace('_FAILURE', '_REQUEST'))
    )
  }
}

export function* apiRequestListener() {
  if (true) {
    yield fork(logger)
  }

  while (true) {
    const action = yield take(
      (action) =>
        action.type.endsWith('_REQUEST') ||
        action.type.endsWith('_SUCCESS') ||
        action.type.endsWith('_FAILURE')
    )
    yield fork(parseAction, action.type)
  }
}
