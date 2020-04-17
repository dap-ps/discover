import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the dapps state domain
 */

const selectDappsDomain = (state: ApplicationRootState) => {
  return state ? state : initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dapps
 */

const selectDapps = () =>
  createSelector(
    selectDappsDomain,
    substate => {
      return substate;
    },
  );

export default selectDapps;
export { selectDappsDomain };
