import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';
import { DAPP_STATUS } from 'utils/constants';
import { BigNumber } from 'ethers/utils';

export interface IDappVote {
  identifier: string;
  token: string;
  amount: BigNumber;
}

export interface IDappRank {
  place: number;
  list: string;
}

export interface IDapp {
  name: string;
  category: DappCategories;
  description: string;
  url: string;
  banner: string;
  icon: string;
  status: DAPP_STATUS;
  ranking?: DappRank[];
  votes: number;
  dateAdded: number;
  uploader?: string;
  ipfsHash?: string;
  hash?: string;
  compressedMetadata?: string;
}

/* --- STATE --- */
interface DappsState {
  readonly dapps: IDapp[];
}

/* --- ACTIONS --- */
type DappsActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type DomainState = DappsState;
type DomainActions = DappsActions;

export { RootState, DomainState, DomainActions };
