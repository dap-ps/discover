import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';
import { DomainState, IDapp } from './types';

/**
 * Direct selector to the dapps state domain
 */

const selectDappsDomain = (state: ApplicationRootState) => {
  return state ? state.dapp : initialState;
};

const selectDapps = (state: ApplicationRootState) => {
  return selectDappsDomain(state).dapps;
};

const selectDappsLoading = (state: ApplicationRootState) => {
  return selectDappsDomain(state).loading;
};

/**
 * Other specific selectors
 */

export const makeSelectDapp = (dappID: string) =>
  createSelector(selectDappsDomain, (domain: DomainState) => {
    return domain.dapps.find((dapp: IDapp) => dapp.ipfsHash == dappID);
  });

export const makeSelectFeaturedDapps = createSelector(
  selectDappsDomain,
  (domain: DomainState) => {
    return domain.dapps.filter((dapp: IDapp) =>
      domain.featuredDapps.includes(dapp.name),
    );
  },
);

export const makeSelectDappsLoading = createSelector(
  selectDappsLoading,
  (loading: boolean) => {
    return loading;
  },
);

export const makeSelectDapps = () =>
  createSelector(selectDappsDomain, (substate: DomainState) => {
    return substate.dapps;
  });

/**
 * Meta selectors
 */

export const makeSelectNumberOfDapps = createSelector(
  selectDapps,
  (dapps: IDapp[]) => dapps.length,
);

/**
 * Default selector used by Dapps
 */
