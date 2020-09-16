import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';
import { DomainState, IDapp } from './types';
import { urlify } from 'routeLinks';

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

export const makeSelectDappsLastUpdate = createSelector(
  selectDappsDomain,
  (domain: DomainState) => {
    return domain.lastUpdate;
  },
);

export const makeSelectDapp = (dappID: string) =>
  createSelector(selectDappsDomain, (domain: DomainState) => {
    return domain.dapps.find((dapp: IDapp) => dapp.ipfsHash == dappID);
  });

export const makeSelectDappByName = (dappUrlName: string) =>
  createSelector(selectDappsDomain, (domain: DomainState) =>
    domain.dapps.find((dapp: IDapp) => urlify(dapp.name) == dappUrlName),
  );

export const makeSelectFeaturedDapps = createSelector(
  selectDappsDomain,
  (domain: DomainState) => {
    return domain.dapps.filter((dapp: IDapp) =>
      domain.featuredDapps.includes(dapp.id),
    )
    .sort(
      (dapp0: IDapp, dapp1: IDapp) => 
        domain.featuredDapps.indexOf(dapp0.id) > domain.featuredDapps.indexOf(dapp1.id) ? 1 : -1);
  },
);


export const makeSelectSearchDapps = (searchString: string) => 
  createSelector(
    selectDapps,
    (dapps: IDapp[]) => dapps.filter((dapp: IDapp) => dapp.name?.toLowerCase().indexOf(searchString.toLowerCase().trim()) >= 0)
  )

export const makeSelectDappsLoading = createSelector(
  selectDappsLoading,
  (loading: boolean) => {
    return loading;
  },
);

export const makeSelectDappNames = createSelector(
  selectDapps,
  (dapps: IDapp[]) => {
    return dapps.map((dapp: IDapp) => dapp.name?.toLowerCase());
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
 * Rankings
 */

export const makeSelectOverallRanking = (targetDapp: IDapp) =>
  createSelector(selectDapps, (dapps: IDapp[]) => {
    return (
      dapps
        .sort((dapp0: IDapp, dapp1: IDapp) =>
          dapp0.votes > dapp1.votes ? -1 : +1,
        )
        .findIndex((dapp: IDapp) => dapp.id == targetDapp.id) + 1
    );
  });

export const makeSelectCategoryRanking = (targetDapp: IDapp) =>
  createSelector(selectDapps, (dapps: IDapp[]) => {
    return (
      dapps
        .filter((dapp: IDapp) => dapp.category == targetDapp.category)
        .sort((dapp0: IDapp, dapp1: IDapp) =>
          dapp0.votes > dapp1.votes ? -1 : +1,
        )
        .findIndex((dapp: IDapp) => dapp.id == targetDapp.id) + 1
    );
  });

/**
 * Default selector used by Dapps
 */
