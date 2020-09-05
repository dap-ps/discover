import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';
import { TRANSACTION_STATUS } from 'utils/constants';

export interface ITransaction {
  state: TRANSACTION_STATUS;
  iconSrc?: string;
  heading: string;
  caption: string;
  hash: string;
}

/* --- STATE --- */
interface WalletState {
  readonly transaction: ITransaction | undefined;
  readonly walletAddress: string;
}

/* --- ACTIONS --- */
type WalletActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type DomainState = WalletState;
type DomainActions = WalletActions;

export { RootState, DomainState, DomainActions };
