/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
// tslint:disable-next-line:no-duplicate-imports
import Redux from 'redux';
import appReducer from 'domain/App/reducer';
import dappsReducer from 'domain/Dapps/reducer';
import tokensReducer from 'domain/Tokens/reducer';
import walletReducer from 'domain/Wallet/reducer';

// tslint:disable-next-line:no-submodule-imports
// tslint:disable-next-line:no-implicit-dependencies

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(
  injectedReducers: Redux.ReducersMapObject = {},
): Redux.Reducer<any> {
  return combineReducers({
    global: appReducer,
    wallet: walletReducer,
    dapp: dappsReducer,
    token: tokensReducer,
    ...injectedReducers,
  });
}
