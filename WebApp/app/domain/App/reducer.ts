import { getType } from 'typesafe-actions';
import { DomainState, DomainActions } from './types';
import { setApiSendingFlag, setErrorMessageAction, setModalAction, setWalletAction, disconnectWalletAction } from './actions';
import { MODAL_COMPONENTS } from './constants';

/*
 *
 * App reducer
 *
 */

export const initialState: DomainState = {
  currentlySending: true,
  errorMessage: "",
  walletAddress: "0x0000000000000000000000000000000000000000",
  modal: MODAL_COMPONENTS.CLEAR
};

function appReducer(state = initialState, action: DomainActions) {
  switch (action.type) {
    case getType(setWalletAction):
        return {
          ...state,
          walletAddress: action.payload
        }
    case getType(disconnectWalletAction):
      return {
        ...state,
        modal: "0x0000000000000000000000000000000000000000"
      }
    case getType(setModalAction):
        return {
          ...state,
          modal: action.payload
        }
    case getType(setApiSendingFlag):
      return {
        ...state,
        currentlySending: action.payload
      }
    case getType(setErrorMessageAction):
      return {
        ...state,
        errorMessage: action.payload
      }
    default:
      return state;
  }
}

export default appReducer;
