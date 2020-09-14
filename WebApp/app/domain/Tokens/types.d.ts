import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';
import { BigNumber } from 'ethers/utils';

// TODO: need to see what embark returns for these values

export interface TokenPriceData {
  [symbol: string]: {
    [resolvedCurrency: string]: number;
  };
}

export interface ERC20Token {
  address: string;
  allowance: BigNumber; // Always towards the SNT contract
  balance: BigNumber; // Always of the current user
  decimals: number;
  logo: string;
  name: string;
  symbol: string;
}

export interface SNTPrice {
  price: number;
}

export interface IDAppsToken extends ERC20Token, KyberERC20Token, SNTPrice {}

/* --- STATE --- */
interface TokensState {
  readonly tokens: IDAppsToken[];
  readonly lastUpdate: number;
}

/* --- ACTIONS --- */
type TokensActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type DomainState = TokensState;
type DomainActions = TokensActions;

export { RootState, DomainState, DomainActions };
