import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the tokens state domain
 */

const selectTokensDomain = (state: ApplicationRootState) => {
  return state ? state : initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by Tokens
 */

const selectTokens = () =>
  createSelector(
    selectTokensDomain,
    substate => {
      return substate;
    },
  );

export default selectTokens;
export { selectTokensDomain };
