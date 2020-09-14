import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';
import { DAPP_STATUS } from 'utils/constants';
import { BigNumber } from 'ethers/utils';

export interface IRawDappMeta {
  available: string;
  balance: string;
  developer: string;
  effectiveBalance: string;
  id: string;
  metadata: string;
  rate: string;
  votesCast: string;
  votesMinted: string;
}

export interface ICachedDapp {
  compressedMetadata: string;
  details: {
    category: string;
    dateAdded: number;
    description: string;
    image: string;
    name: string;
    uploader: string;
    url: string;
  };
  email: string;
  hash: string;
  ipfsHash: string;
  status: DAPP_STATUS;
}

export interface IDappVote {
  id: string;
  token?: string;
  amount?: number;
  icon: string;
  name: string;
  desc: string;
}

export interface IWithdrawRequest {
  id: string;
  amount: number;
  max: boolean;
  icon: string;
  name: string;
  desc: string;
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
  sntValue?: number;
  ipfsHash?: string;
  hash?: string;
  dateAdded: number;
  downvoteCost?: number;
  uploader: string;
  // metadata
  compressedMetadata?: string;
  email: string;
}

/* --- STATE --- */
interface DappsState {
  readonly featuredDapps: string[];
  readonly dapps: IDapp[];
  readonly loading: boolean;
  readonly lastUpdate: number;
}

/* --- ACTIONS --- */
type DappsActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type DomainState = DappsState;
type DomainActions = DappsActions;

export { RootState, DomainState, DomainActions };
