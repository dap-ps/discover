import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';
import { constants } from 'ethers';

/**
 * Direct selector to the wallet state domain
 */

const selectWalletDomain = (state: ApplicationRootState) => {
  return state ? state.wallet : initialState;
};

/**
 * Other specific selectors
 */
const selectIsConnected = (state: ApplicationRootState) => {
  // TODO check provider state
  return state.wallet.walletAddress != constants.AddressZero;
};

export const makeSelectIsConnected = createSelector(
  selectIsConnected,
  (substate: boolean) => {
    return substate;
  },
);

/**
 * Default selector used by Wallet
 */

const selectWallet = () =>
  createSelector(selectWalletDomain, (substate) => {
    return substate;
  });

export default selectWallet;
export { selectWalletDomain };
