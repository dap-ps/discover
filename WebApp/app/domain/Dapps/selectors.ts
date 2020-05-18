import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the dapps state domain
 */

const selectDappsDomain = (state: ApplicationRootState) => {
  return state ? state.dapp : initialState;
};

/**
 * Other specific selectors
 */

export const makeSelectDapp = (dappID: string) => createSelector(
  selectDappsDomain,
  domain => domain.dapps[dappID]
)

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
