/*
 *
 * Dapps reducer
 *
 */

import { defaultAction } from './actions';

import { DomainState, DomainActions } from './types';
import { getType } from 'typesafe-actions';

export const initialState: DomainState = {
  dapps: []
};

function dappsReducer(
  state: DomainState = initialState,
  action: DomainActions,
) {
  switch (action.type) {
    case getType(defaultAction):
      return state;
    default:
      return state;
  }
}

export default dappsReducer;
