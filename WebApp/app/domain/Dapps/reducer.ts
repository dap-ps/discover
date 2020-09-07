/*
 *
 * Dapps reducer
 *
 */

import { DomainState, DomainActions, IDapp } from './types';
import { DAPPS } from './mocks';
import { getType } from 'typesafe-actions';
import {
  setDappsLoadingAction,
  createDappAction,
  updateDappDataAction,
} from './actions';

export const initialState: DomainState = {
  featuredDapps: ['sablier', 'oasis', 'zerion'],
  loading: false,
  dapps: Object.keys(DAPPS).map((key) => DAPPS[key]),
};

function dappsReducer(
  state: DomainState = initialState,
  action: DomainActions,
) {
  switch (action.type) {
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
    // case getType(fetchDappsAction.success):
    //   return  {
    //     ...state,
    //     dapps: action.payload
    //   }
    case getType(setDappsLoadingAction):
      return {
        ...state,
        loading: action.payload,
      };
    // case getType(defaultAction):
    //   return state;
    default:
      return state;
  }
}

export default dappsReducer;
