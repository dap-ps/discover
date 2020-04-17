import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

// TODO: need to see what embark returns for these values

export interface ERC20Token {
  address: string,
  name: string,
  totalSupply: number,
  decimals: number,
  allowance: number, // Always towards the SNT contract
  balance: number // Always of the current user
}

/* --- STATE --- */
interface TokensState {
  readonly tokens: ERC20Token[];
}

/* --- ACTIONS --- */
type TokensActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type DomainState = TokensState;
type DomainActions = TokensActions;

export { RootState, DomainState, DomainActions };
