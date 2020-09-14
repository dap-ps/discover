/*
 *
 * Tokens reducer
 *
 */

import { DomainState, DomainActions } from './types';
import { getType } from 'typesafe-actions';
import { getBalancesAction, getPricesAction } from './actions';

export const initialState: DomainState = {
  tokens: [],
  lastUpdate: 0,
};

function tokensReducer(
  state: DomainState = initialState,
  action: DomainActions,
) {
  switch (action.type) {
    case getType(getPricesAction.success):
      return {
        ...state,
        tokens: [
          ...state.tokens.map((token) => {
            if (action.payload[token.symbol] != null) {
              token.price = action.payload[token.symbol]['SNT'];
            }
            return token;
          }),
        ],
        lastUpdate: Date.now(),
      };
    case getType(getBalancesAction.success):
      return {
        ...state,
        tokens: [...action.payload],
        lastUpdate: Date.now(),
      };
    default:
      return state;
  }
}

export default tokensReducer;
