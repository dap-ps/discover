/*
 *
 * Tokens actions
 *
 */

import { createAsyncAction } from 'typesafe-actions';
import ActionTypes from './constants';
import { IDAppsToken, TokenPriceData } from './types';

export const getBalancesAction = createAsyncAction(
  ActionTypes.GET_BALANCES_REQUEST,
  ActionTypes.GET_BALANCES_SUCCESS,
  ActionTypes.GET_BALANCES_FAILURE,
)<void, IDAppsToken[], string>();

export const getPricesAction = createAsyncAction(
  ActionTypes.GET_PRICES_REQUEST,
  ActionTypes.GET_PRICES_SUCCESS,
  ActionTypes.GET_PRICES_FAILURE,
)<void, TokenPriceData, string>();
