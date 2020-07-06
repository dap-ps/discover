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

export const makeSelectDapp = (dappID: string) =>
  createSelector(selectDappsDomain, (domain) => {
    return domain.dapps.find((dapp) => dapp.ipfsHash == dappID);
  });

/**
 * Default selector used by Dapps
 */

export const makeSelectDapps = () =>
  createSelector(selectDappsDomain, (substate) => {
    return substate.dapps;
  });

export { selectDappsDomain };
