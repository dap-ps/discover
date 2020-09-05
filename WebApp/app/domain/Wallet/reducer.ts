/*
 *
 * Wallet reducer
 *
 */

import {
  setWalletAction,
  disconnectWalletAction,
  awaitTxAction,
  clearAwaitTxAction,
  connectAccountAction,
} from './actions';

import { DomainState, DomainActions } from './types';
import { getType } from 'typesafe-actions';
import { constants } from 'ethers';

export const initialState: DomainState = {
  walletAddress: constants.AddressZero,
  transaction: undefined,
};

function walletReducer(
  state: DomainState = initialState,
  action: DomainActions,
) {
  switch (action.type) {
    case getType(connectAccountAction.success):
      return {
        ...state,
        walletAddress: action.payload,
      };
    case getType(awaitTxAction.request):
      return {
        ...state,
        transaction: action.payload,
      };
    case getType(awaitTxAction.success):
      return {
        ...state,
        transaction: action.payload,
      };
    case getType(clearAwaitTxAction):
      return {
        ...state,
        transaction: undefined,
      };
    case getType(setWalletAction):
      return {
        ...state,
        walletAddress: action.payload,
      };
    case getType(disconnectWalletAction):
      return {
        ...state,
        modal: constants.AddressZero,
      };
    default:
      return state;
  }
}

export default walletReducer;
