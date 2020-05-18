import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { MODAL_COMPONENTS } from './constants';


/**
 * Direct selector to the user state domain
 */

// const selectAppDomain = (state: ApplicationRootState) => state.app;

// Notes: Its done like this for allowing complex selection actions to be memoized
const selectModalState = (state: ApplicationRootState) => {
  return state.global.modal;
};

const selectCurrentlySending = (state: ApplicationRootState) => {
  return state.global.currentlySending;
};

export const makeSelectCurrentlySending =
  createSelector(selectCurrentlySending, (substate: boolean) =>{
    return substate;
  })


export const makeSelectModalState =
  createSelector(selectModalState, (substate: MODAL_COMPONENTS) => {
    return substate
  })
/**
 * Other specific selectors
 */


/**
 * Default selector used by App
 */

// export default selectApp;
