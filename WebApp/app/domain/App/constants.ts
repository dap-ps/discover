/*
 * These are the variables that determine what our central data store (`../reducers/index.js`)
 * changes in our state.
 */
enum ActionTypes {
  SET_API_SENDING_FLAG = '@@dapps/global/SET_API_SENDING_FLAG',
  ADD_TO_REQUEST_QUEUE = '@@dapps/global/ADD_TO_REQUEST_QUEUE',
  REMOVE_FROM_REQUEST_QUEUE = '@@dapps/global/REMOVE_FROM_REQUEST_QUEUE',
  CLEAR_REQUEST_QUEUE = '@@dapps/global/CLEAR_REQUEST_QUEUE',

  SET_ERROR_MESSAGE = '@@dapps/global/SET_ERROR_MESSAGE',
  SET_ACTIVE_ERROR_CODE = '@@dapps/global/SET_ACTIVE_ERROR_CODE',

  SET_CONNECTED = '@@dapps/global/SET_CONNECTED',
  SET_MODAL = '@@dapps/global/SET_MODAL',
  
  SET_NETWORK = '@@dapps/global/SET_NETWORK',

  CONNECT_ACCOUNT_REQUEST = '@@dapps/global/CONNECT_ACCOUNT_REQUEST',
  CONNECT_ACCOUNT_SUCCESS = '@@dapps/global/CONNECT_ACCOUNT_SUCCESS',
  CONNECT_ACCOUNT_FAILURE = '@@dapps/global/CONNECT_ACCOUNT_FAILURE',

  SET_CURRENT_ACCOUNT = '@@dapps/global/SET_CURRENT_ACCOUNT',
}

export default ActionTypes;
