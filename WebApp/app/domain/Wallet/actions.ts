/*
 *
 * Wallet actions
 *
 */

import { createStandardAction } from 'typesafe-actions';
import ActionTypes from './constants';

export const connectWalletAction = createStandardAction(
  ActionTypes.CONNECT_WALLET,
)<void>();
export const disconnectWalletAction = createStandardAction(
  ActionTypes.DISCONNECT_WALLET,
)<void>();
export const setWalletAction = createStandardAction(ActionTypes.SET_WALLET)<
  string
>();
