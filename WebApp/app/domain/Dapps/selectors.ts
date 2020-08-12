import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';
import { DomainState, IDapp } from './types';

/**
 * Direct selector to the dapps state domain
 */

const selectDappsDomain = (state: ApplicationRootState) => {
  return state ? state.dapp : initialState
}

/**
 * Other specific selectors
 */

export const makeSelectDapp = (dappID: string) =>
  createSelector(selectDappsDomain, (domain: DomainState) => {
    return domain.dapps.find((dapp: IDapp) => dapp.ipfsHash == dappID)
  })

export const makeSelectFeaturedDapps =
  createSelector(selectDappsDomain, (domain: DomainState) => {
    return domain.dapps.filter((dapp: IDapp) => domain.featuredDapps.includes(dapp.name))
  })

/**
 * Default selector used by Dapps
 */

export const makeSelectDapps = () =>
  createSelector(selectDappsDomain, (substate: DomainState) => {
    return substate.dapps
  })

