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

const selectRequestQueue = (state: ApplicationRootState) =>
  state.global.requestQueue;
export const makeSelectRequestQueue = createSelector(
  selectRequestQueue,
  (requestQueue: string[]) => requestQueue,
);

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

export const makeSelectNetworkValid = createSelector(
  selectNetwork,
  (network: number) =>
    network == parseInt(process.env['TARGET_NETWORK'] as string),
);
