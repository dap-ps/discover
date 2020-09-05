import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';
import { constants } from 'ethers';
import { ITransaction } from './types';

/**
 * Direct selector to the wallet state domain
 */

const selectWalletDomain = (state: ApplicationRootState) => {
  return state ? state.wallet : initialState;
};

const selectTransaction = (state: ApplicationRootState) => {
  return state.wallet.transaction;
};

export const selectWalletAddress = (state: ApplicationRootState) => {
  return state.wallet.walletAddress;
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

export const makeSelectWalletAddress = createSelector(
  selectWalletAddress,
  (substate: string) => {
    return substate;
  },
);

export const makeSelectTransaction = createSelector(
  selectTransaction,
  (transaction: ITransaction | undefined) => {
    return transaction;
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
