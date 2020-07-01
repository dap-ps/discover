import { getType } from 'typesafe-actions';
import { DomainState, DomainActions } from './types';
import { setApiSendingFlag, setErrorMessageAction } from './actions';

/*
 *
 * App reducer
 *
 */

export const initialState: DomainState = {
  currentlySending: true,
  errorMessage: '',
};

function appReducer(state = initialState, action: DomainActions) {
  switch (action.type) {
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
    default:
      return state;
  }
}

export default appReducer;
