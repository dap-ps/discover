/*
 *
 * Dapps actions
 *
 */

import { createAsyncAction } from 'typesafe-actions';
import ActionTypes from './constants';
import { IDapp, IDappVote } from './types';

export const createDappAction = createAsyncAction(
  ActionTypes.CREATE_DAPP_REQUEST,
  ActionTypes.CREATE_DAPP_SUCCESS,
  ActionTypes.CREATE_DAPP_FAILURE
  )<
  IDapp,
  Partial<IDapp>,
  string
>();

export const updateDappAction = createAsyncAction(
  ActionTypes.UPDATE_DAPP_REQUEST,
  ActionTypes.UPDATE_DAPP_SUCCESS,
  ActionTypes.UPDATE_DAPP_FAILURE
  )<
  IDapp,
  Partial<IDapp>,
  string
>();

export const upvoteDappAction = createAsyncAction(
  ActionTypes.UPVOTE_DAPP_REQUEST,
  ActionTypes.UPVOTE_DAPP_SUCCESS,
  ActionTypes.UPVOTE_DAPP_FAILURE
  )<
  IDappVote,
  Partial<IDapp>,
  string
>();


export const downvoteDappAction = createAsyncAction(
  ActionTypes.DOWNVOTE_DAPP_REQUEST,
  ActionTypes.DOWNVOTE_DAPP_SUCCESS,
  ActionTypes.DOWNVOTE_DAPP_FAILURE
  )<
  string,
  Partial<IDapp>,
  string
>();
