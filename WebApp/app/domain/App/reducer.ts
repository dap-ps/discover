import { getType } from 'typesafe-actions';
import { DomainState, DomainActions } from './types';
import {
  setApiSendingFlag,
  setErrorMessageAction,
  connectAccountAction,
  setNetworkAction,
} from './actions';

/*
 *
 * App reducer
 *
 */

export const initialState: DomainState = {
  currentlySending: true,
  errorMessage: '',
  currentAccount: '0x0000000000000000000000000000000000000000',
  network: 3
};

function appReducer(state = initialState, action: DomainActions) {
  switch (action.type) {
    case getType(setNetworkAction): 
      return {
        ...state,
        network: action.payload
      }
    case getType(setApiSendingFlag):
      return {
        ...state,
        currentlySending: action.payload,
      };
    case getType(setErrorMessageAction):
      return {
        ...state,
        errorMessage: action.payload,
      };

    case getType(connectAccountAction.success):
      return {
        ...state,
        currentAccount: action.payload,
      };
    default:
      return state;
  }
}

export default appReducer;
