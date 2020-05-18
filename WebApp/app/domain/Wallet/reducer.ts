/*
 *
 * Wallet reducer
 *
 */

import { setWalletAction, disconnectWalletAction } from './actions';

import { DomainState, DomainActions } from './types';
import { getType } from 'typesafe-actions';
import { constants } from 'ethers';

export const initialState: DomainState = {
  walletAddress: constants.AddressZero,
};

function walletReducer(
  state: DomainState = initialState,
  action: DomainActions,
) {
  switch (action.type) {
    case getType(setWalletAction):
        return {
          ...state,
          walletAddress: action.payload
        }
    case getType(disconnectWalletAction):
      return {
        ...state,
        modal: constants.AddressZero,
      }
    default:
      return state;
  }
}

export default walletReducer;
