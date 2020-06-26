/*
 *
 * Dapps reducer
 *
 */


import { DomainState, DomainActions } from './types';
import { DAPPS } from './mocks';

export const initialState: DomainState = {
  dapps: Object.keys(DAPPS).map(key => DAPPS[key])
};

function dappsReducer(
  state: DomainState = initialState,
  action: DomainActions,
) {
  switch (action.type) {
    // case getType(defaultAction):
    //   return state;
    default:
      return state;
  }
}

export default dappsReducer;
