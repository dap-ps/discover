import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';

/**
 * Direct selector to the user state domain
 */

// const selectAppDomain = (state: ApplicationRootState) => state.app;

// Notes: Its done like this for allowing complex selection actions to be memoized

const selectCurrentlySending = (state: ApplicationRootState) => {
  return state.global.currentlySending;
};

const selectNetwork = (state: ApplicationRootState) => {
  return state.global.network;
};

export const selectCurrentAccount = (state: ApplicationRootState) => {
  return state.global.currentAccount;
};

export const makeSelectCurrentlySending = createSelector(
  selectCurrentlySending,
  (substate: boolean) => {
    return substate;
  },
);

export const makeSelectCurrentAccount = createSelector(
  selectCurrentAccount,
  (substate: string) => {
    return substate;
  },
);

export const makeSelectNetwork = createSelector(
  selectNetwork,
  (network: number) => {
    return network;
  },
);
