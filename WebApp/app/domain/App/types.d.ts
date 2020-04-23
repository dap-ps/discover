import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface AppState {
  currentlySending: boolean;
  errorMessage: string;
  walletAddress: string;
  modal: MODAL_COMPONENTS;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type DomainState = AppState;
type DomainActions = AppActions;

export { RootState, DomainState, DomainActions };
