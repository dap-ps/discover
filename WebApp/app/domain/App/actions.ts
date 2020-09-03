import { createStandardAction, createAsyncAction } from 'typesafe-actions';
import ActionTypes from './constants';
import { ERROR_CODES } from 'utils/constants';

export const setApiSendingFlag = createStandardAction(
  ActionTypes.SET_API_SENDING_FLAG,
)<boolean>();

export const setErrorMessageAction = createStandardAction(
  ActionTypes.SET_ERROR_MESSAGE,
)<string>();

export const setActiveErrorCodeAction = createStandardAction(
  ActionTypes.SET_ACTIVE_ERROR_CODE,
)<ERROR_CODES>();

export const addToRequestQueueAction = createStandardAction(
  ActionTypes.ADD_TO_REQUEST_QUEUE,
)<string>();

export const removeFromRequestQueueAction = createStandardAction(
  ActionTypes.REMOVE_FROM_REQUEST_QUEUE,
)<string>();

export const clearRequestQueueAction = createStandardAction(
  ActionTypes.CLEAR_REQUEST_QUEUE,
)<void>();

export const connectAccountAction = createAsyncAction(
  ActionTypes.CONNECT_ACCOUNT_REQUEST,
  ActionTypes.CONNECT_ACCOUNT_SUCCESS,
  ActionTypes.CONNECT_ACCOUNT_FAILURE,
)<void, string, string>();

export const setNetworkAction = createStandardAction(
  ActionTypes.SET_NETWORK,
)<number>();