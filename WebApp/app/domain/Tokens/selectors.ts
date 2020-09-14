import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';
import { DomainState, IDAppsToken } from './types';

/**
 * Direct selector to the tokens state domain
 */

const selectTokensDomain = (state: ApplicationRootState) => {
  return state ? state.token : initialState;
};

/**
 * Other specific selectors
 */
export const makeSelectTokensLastUpdate = createSelector(
  selectTokensDomain,
  (domain: DomainState) => {
    return domain.lastUpdate;
  },
);

export const makeSelectToken = (symbol: string) =>
  createSelector(selectTokensDomain, (domain: DomainState) => {
    return domain.tokens.find(
      (token: IDAppsToken) =>
        token.symbol.toLowerCase() == symbol.toLowerCase(),
    );
  });
