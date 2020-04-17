import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface AppState {
  currentlySending: boolean;
  errorMessage: string;
  connected: false;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type DomainState = AppState;
type DomainActions = AppActions;

export { RootState, DomainState, DomainActions };
