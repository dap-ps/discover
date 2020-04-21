/*
 * These are the variables that determine what our central data store (`../reducers/index.js`)
 * changes in our state.
 */

export enum MODAL_COMPONENTS{
  CLEAR = 0,
  SUBMIT_DAPP = 1,
  UPVOTE = 2,
  DOWNVOTE = 3
}

enum ActionTypes {
  SET_API_SENDING_FLAG = '@@dapps/global/SET_API_SENDING_FLAG',
  SET_ERROR_MESSAGE = '@@dapps/global/SET_ERROR_MESSAGE',
  CONNECT_WALLET = '@@dapps/global/CONNECT_WALLET',
  DISCONNECT_WALLET = '@@dapps/global/DISCONNECT_WALLET',
  SET_CONNECTED = '@@dapps/global/SET_CONNECTED',
  SET_MODAL = '@@dapps/global/SET_MODAL',
}

export default ActionTypes;
