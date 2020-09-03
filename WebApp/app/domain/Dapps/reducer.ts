/*
 *
 * Dapps reducer
 *
 */

import { DomainState, DomainActions } from './types';
import { DAPPS } from './mocks';
import { getType } from 'typesafe-actions';
import { setDappsLoadingAction } from './actions';

export const initialState: DomainState = {
  featuredDapps: ['sablier', 'oasis', 'zerion'],
  loading: false,
  dapps: Object.keys(DAPPS).map((key) => DAPPS[key]),
};

function dappsReducer(
  state: DomainState = initialState,
  action: DomainActions,
) {
  switch (action.type) {
    case getType(setDappsLoadingAction):
      return {
        ...state,
        loading: action.payload
      }
    // case getType(defaultAction):
    //   return state;
    default:
      return state;
  }
}

export default dappsReducer;
