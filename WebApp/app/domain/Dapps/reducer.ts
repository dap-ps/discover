/*
 *
 * Dapps reducer
 *
 */


import { DomainState, DomainActions } from './types';

export const initialState: DomainState = {
  dapps: []
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
