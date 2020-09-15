/*
 *
 * Dapps reducer
 *
 */

import { DomainState, DomainActions, IDapp } from './types';
import { getType } from 'typesafe-actions';
import {
  setDappsLoadingAction,
  createDappAction,
  updateDappDataAction,
  fetchDappsAction,
  updateDappAction,
} from './actions';

export const initialState: DomainState = {
  featuredDapps: [
    '0x3afd03eec6b14d88579cb83b0a599dbefeb73dd859bceba20bc77b5532586378', // 1inch
    '0x3a9130370a3d4f68cf989c8e55526d131b9cd083af9075ea1fd527f63db48e93', // zerion
    '0x6be0814d1839c307802f6f4ab89a15471db316d301d8dc4834c3464efc8f9237', // oasis
  ],
  loading: false,
  dapps: [],
  lastUpdate: 0,
};

function dappsReducer(
  state: DomainState = initialState,
  action: DomainActions,
) {
  switch (action.type) {
    case getType(updateDappAction.success):
      return {
        ...state,
        dapps: [
          ...state.dapps.map((dapp: IDapp) =>
            dapp.id == action.payload.id ? action.payload : dapp,
          ),
        ],
      };
    case getType(updateDappDataAction.success):
      return {
        ...state,
        dapps: [
          ...state.dapps.map((dapp: IDapp) =>
            dapp.id == action.payload.id ? action.payload : dapp,
          ),
        ],
      };
    case getType(createDappAction.success):
      return {
        ...state,
        dapps: [...state.dapps, action.payload],
      };
    case getType(fetchDappsAction.success):
      return {
        ...state,
        dapps: action.payload,
        lastUpdate: Date.now(),
      };
    case getType(setDappsLoadingAction):
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

export default dappsReducer;


