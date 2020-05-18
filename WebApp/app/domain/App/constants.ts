/*
 * These are the variables that determine what our central data store (`../reducers/index.js`)
 * changes in our state.
 */
enum ActionTypes {
  SET_API_SENDING_FLAG = '@@dapps/global/SET_API_SENDING_FLAG',
  SET_ERROR_MESSAGE = '@@dapps/global/SET_ERROR_MESSAGE',

  SET_CONNECTED = '@@dapps/global/SET_CONNECTED',
  SET_MODAL = '@@dapps/global/SET_MODAL',
}

export default ActionTypes;
