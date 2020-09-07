/*
 *
 * Wallet constants
 *
 */

enum ActionTypes {
  DISCONNECT_WALLET = '@@dapps/wallet/DISCONNECT_WALLET',
  SET_WALLET = '@@dapps/wallet/SET_WALLET',

  AWAIT_TX_REQUEST = '@@dapps/wallet/AWAIT_TX_REQUEST',
  AWAIT_TX_SUCCESS = '@@dapps/wallet/AWAIT_TX_SUCCESS',
  AWAIT_TX_FAILURE = '@@dapps/wallet/AWAIT_TX_FAILURE',

  CONNECT_ACCOUNT_REQUEST = '@@dapps/wallet/CONNECT_ACCOUNT_REQUEST',
  CONNECT_ACCOUNT_SUCCESS = '@@dapps/wallet/CONNECT_ACCOUNT_SUCCESS',
  CONNECT_ACCOUNT_FAILURE = '@@dapps/wallet/CONNECT_ACCOUNT_FAILURE',

  CLEAR_AWAIT_TX = '@@dapps/wallet/CLEAR_AWAIT_TX',
}

export default ActionTypes;
