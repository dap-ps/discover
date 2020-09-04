import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';
import { DAPP_STATUS } from 'utils/constants';
import { BigNumber } from 'ethers/utils';

export interface IRawDappMeta {
  available: string
  balance: string
  developer: string
  effectiveBalance: string
  id: string
  metadata: string
  rate: string
  votesCast: string
  votesMinted: string
}

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
  desc: string;
  url: string;
  image: string;
  icon: string;
  status: DAPP_STATUS;
  ranking?: DappRank[];
  // On chain data
  id: string;
  votes: number;
  available: number;

  // Potentially on chain values
  sntValue: number;
  ipfsHash?: string;
  hash?: string;
  dateAdded: number;
  downvoteCost?: number;
  uploader: string
  // metadata
  compressedMetadata?: string;
  email: string;
}

/* --- STATE --- */
interface DappsState {
  readonly featuredDapps: string[];
  readonly dapps: IDapp[];
  readonly loading: boolean;
}

/* --- ACTIONS --- */
type DappsActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type DomainState = DappsState;
type DomainActions = DappsActions;

export { RootState, DomainState, DomainActions };
