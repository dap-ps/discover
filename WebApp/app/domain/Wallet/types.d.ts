import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface WalletState {
  readonly walletAddress: string;
}

/* --- ACTIONS --- */
type WalletActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type DomainState = WalletState;
type DomainActions = WalletActions;

export { RootState, DomainState, DomainActions };
