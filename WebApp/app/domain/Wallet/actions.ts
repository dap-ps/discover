/*
 *
 * Wallet actions
 *
 */

import { createStandardAction, createAsyncAction } from 'typesafe-actions';
import ActionTypes from './constants';
import { ITransaction } from './types';

export const disconnectWalletAction = createStandardAction(
  ActionTypes.DISCONNECT_WALLET,
)<void>();

export const setWalletAction = createStandardAction(ActionTypes.SET_WALLET)<
  string
>();

export const connectAccountAction = createAsyncAction(
  ActionTypes.CONNECT_ACCOUNT_REQUEST,
  ActionTypes.CONNECT_ACCOUNT_SUCCESS,
  ActionTypes.CONNECT_ACCOUNT_FAILURE,
)<void, string, string>();

export const awaitTxAction = createAsyncAction(
  ActionTypes.AWAIT_TX_REQUEST,
  ActionTypes.AWAIT_TX_SUCCESS,
  ActionTypes.AWAIT_TX_FAILURE,
)<ITransaction, ITransaction, ITransaction>();

export const clearAwaitTxAction = createStandardAction(
  ActionTypes.CLEAR_AWAIT_TX,
)<void>();
