/*
 * These are the variables that determine what our central data store (`../reducers/index.js`)
 * changes in our state.
 */
enum ActionTypes {
  SET_LOADING = '@@dapps/global/SET_LOADING',
  ADD_TO_REQUEST_QUEUE = '@@dapps/global/ADD_TO_REQUEST_QUEUE',
  REMOVE_FROM_REQUEST_QUEUE = '@@dapps/global/REMOVE_FROM_REQUEST_QUEUE',
  CLEAR_REQUEST_QUEUE = '@@dapps/global/CLEAR_REQUEST_QUEUE',

  SET_ACTIVE_ERROR_CODE = '@@dapps/global/SET_ACTIVE_ERROR_CODE',

  SET_CONNECTED = '@@dapps/global/SET_CONNECTED',
  SET_MODAL = '@@dapps/global/SET_MODAL',

  SET_NETWORK = '@@dapps/global/SET_NETWORK',

  // TODO: Remove when cache server has namespacing
  SET_NETWORK_VALID = '@@dapps/global/SET_NETWORK_VALID',
}

export default ActionTypes;
