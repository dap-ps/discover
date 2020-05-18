import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';


/**
 * Direct selector to the user state domain
 */

// const selectAppDomain = (state: ApplicationRootState) => state.app;

// Notes: Its done like this for allowing complex selection actions to be memoized

const selectCurrentlySending = (state: ApplicationRootState) => {
  return state.global.currentlySending;
};

export const makeSelectCurrentlySending =
  createSelector(selectCurrentlySending, (substate: boolean) =>{
    return substate;
  })


/**
 * Other specific selectors
 */


/**
 * Default selector used by App
 */

// export default selectApp;
