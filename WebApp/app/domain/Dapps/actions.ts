/*
 *
 * Dapps actions
 *
 */

import { createAsyncAction, createStandardAction } from 'typesafe-actions';
import ActionTypes from './constants';
import { IDapp, IDappVote, IWithdrawRequest } from './types';

export const fetchDappsAction = createAsyncAction(
  ActionTypes.FETCH_DAPPS_REQUEST,
  ActionTypes.FETCH_DAPPS_SUCCESS,
  ActionTypes.FETCH_DAPPS_FAILURE,
)<void, IDapp[], string>();

export const updateDappDataAction = createAsyncAction(
  ActionTypes.UPDATE_DAPP_DATA_REQUEST,
  ActionTypes.UPDATE_DAPP_DATA_SUCCESS,
  ActionTypes.UPDATE_DAPP_DATA_FAILURE,
)<string, IDapp, string>();

export const createDappAction = createAsyncAction(
  ActionTypes.CREATE_DAPP_REQUEST,
  ActionTypes.CREATE_DAPP_SUCCESS,
  ActionTypes.CREATE_DAPP_FAILURE,
)<IDapp, Partial<IDapp>, string>();

export const updateDappAction = createAsyncAction(
  ActionTypes.UPDATE_DAPP_REQUEST,
  ActionTypes.UPDATE_DAPP_SUCCESS,
  ActionTypes.UPDATE_DAPP_FAILURE,
)<IDapp, Partial<IDapp>, string>();

export const withdrawAction = createAsyncAction(
  ActionTypes.WITHDRAW_REQUEST,
  ActionTypes.WITHDRAW_SUCCESS,
  ActionTypes.WITHDRAW_FAILURE,
)<IWithdrawRequest, void, string>();

export const upvoteDappAction = createAsyncAction(
  ActionTypes.UPVOTE_DAPP_REQUEST,
  ActionTypes.UPVOTE_DAPP_SUCCESS,
  ActionTypes.UPVOTE_DAPP_FAILURE,
)<IDappVote, void, string>();

export const downvoteDappAction = createAsyncAction(
  ActionTypes.DOWNVOTE_DAPP_REQUEST,
  ActionTypes.DOWNVOTE_DAPP_SUCCESS,
  ActionTypes.DOWNVOTE_DAPP_FAILURE,
)<IDappVote, void, string>();

export const setDappsLoadingAction = createStandardAction(
  ActionTypes.SET_LOADING,
)<boolean>();
