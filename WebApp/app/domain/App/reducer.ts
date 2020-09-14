import { getType } from 'typesafe-actions';
import { DomainState, DomainActions } from './types';
import { setLoadingAction, setNetworkAction } from './actions';

/*
 *
 * App reducer
 *
 */

export const initialState: DomainState = {
  loading: true,
  errorMessage: '',
  network: parseInt(process.env["TARGET_NETWORK"] as string),
};

function appReducer(state = initialState, action: DomainActions) {
  switch (action.type) {
    case getType(setNetworkAction):
      return {
        ...state,
        network: action.payload,
      };
    case getType(setLoadingAction):
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

export default appReducer;
