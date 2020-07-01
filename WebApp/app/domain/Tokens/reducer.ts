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
      };
    case getType(getBalancesAction.success):
      return {
        ...state,
        tokens: [...action.payload],
      };
    default:
      return state;
  }
}

export default tokensReducer;
