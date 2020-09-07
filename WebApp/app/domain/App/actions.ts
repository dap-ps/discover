import { createStandardAction } from 'typesafe-actions';
import ActionTypes from './constants';
import { ERROR_CODES } from 'utils/constants';

export const setLoadingAction = createStandardAction(ActionTypes.SET_LOADING)<
  boolean
>();

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

export const setNetworkAction = createStandardAction(ActionTypes.SET_NETWORK)<
  number
>();
