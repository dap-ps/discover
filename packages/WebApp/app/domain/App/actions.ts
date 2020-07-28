import { createStandardAction } from '../Dapps/node_modules/typesafe-actions';
import ActionTypes from './constants';
import { ERROR_CODES } from './sagas/node_modules/utils/constants';

export const setApiSendingFlag = createStandardAction(
  ActionTypes.SET_API_SENDING_FLAG,
)<boolean>();

export const setErrorMessageAction = createStandardAction(
  ActionTypes.SET_ERROR_MESSAGE,
)<string>();

export const setActiveErrorCodeAction = createStandardAction(
  ActionTypes.SET_ACTIVE_ERROR_CODE
)<ERROR_CODES>()

export const addToRequestQueueAction = createStandardAction(
  ActionTypes.ADD_TO_REQUEST_QUEUE
)<string>()

export const removeFromRequestQueueAction = createStandardAction(
  ActionTypes.REMOVE_FROM_REQUEST_QUEUE
)<string>()

export const clearRequestQueueAction = createStandardAction(
  ActionTypes.CLEAR_REQUEST_QUEUE
)<void>()
