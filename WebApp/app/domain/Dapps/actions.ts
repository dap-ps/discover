/*
 *
 * Dapps actions
 *
 */

import { createStandardAction } from 'typesafe-actions';
import ActionTypes from './constants';

export const defaultAction = createStandardAction(ActionTypes.DEFAULT_ACTION)<
  void
>();
