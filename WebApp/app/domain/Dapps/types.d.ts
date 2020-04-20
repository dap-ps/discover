import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

// Data interfaces
export interface IDappRank {
  place: number,
  list: string
}

export interface IDapp {
  name: string,
  category: DappCategories,
  description: string,
  url: string,
  banner: string,
  icon: string,
  reviewed: boolean,
  ranking: DappRank[],
  votes: number
}

/* --- STATE --- */
interface DappsState {
  readonly dapps: Dapp[]
}

/* --- ACTIONS --- */
type DappsActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type DomainState = DappsState;
type DomainActions = DappsActions;

export { RootState, DomainState, DomainActions };
