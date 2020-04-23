/*
 *
 * Tokens reducer
 *
 */

import { DomainState, DomainActions } from './types';
// import { getType } from 'typesafe-actions';

export const initialState: DomainState = {
  tokens: [
  ],
};

function tokensReducer(
  state: DomainState = initialState,
  action: DomainActions,
) {
  switch (action.type) {
    default:
      return state;
  }
}

export default tokensReducer;
