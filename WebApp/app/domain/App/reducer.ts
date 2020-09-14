import { getType } from 'typesafe-actions';
import { DomainState, DomainActions } from './types';
import {
  setLoadingAction,
  setNetworkAction,
  addToRequestQueueAction,
  removeFromRequestQueueAction,
  clearRequestQueueAction,
} from './actions';

/*
 *
 * App reducer
 *
 */

export const initialState: DomainState = {
  loading: true,
  errorMessage: '',
  network: parseInt(process.env['TARGET_NETWORK'] as string),
  requestQueue: [],
};

function appReducer(state = initialState, action: DomainActions) {
  switch (action.type) {
    case getType(clearRequestQueueAction):
      return {
        ...state,
        requestQueue: [],
      };
    case getType(addToRequestQueueAction):
      return {
        ...state,
        requestQueue: [...state.requestQueue, action.payload],
      };
    case getType(removeFromRequestQueueAction):
      return {
        ...state,
        requestQueue: state.requestQueue.filter(
          (item) => item != action.payload,
        ),
      };
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
