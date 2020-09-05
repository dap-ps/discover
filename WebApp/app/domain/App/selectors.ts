import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';

/**
 * Direct selector to the user state domain
 */

// const selectAppDomain = (state: ApplicationRootState) => state.app;

// Notes: Its done like this for allowing complex selection actions to be memoized

const selectLoading = (state: ApplicationRootState) => {
  return state.global.loading;
};

const selectNetwork = (state: ApplicationRootState) => {
  return state.global.network;
};

export const makeSelectLoading = createSelector(
  selectLoading,
  (substate: boolean) => {
    return substate;
  },
);

export const makeSelectNetwork = createSelector(
  selectNetwork,
  (network: number) => {
    return network;
  },
);
