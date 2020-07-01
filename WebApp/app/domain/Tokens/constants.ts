/*
 *
 * Tokens constants
 *
 */

export const TOKEN_COIN_API =
  'https://raw.githubusercontent.com/TrustWallet/tokens/master/coins';
export const TOKEN_API =
  'https://raw.githubusercontent.com/TrustWallet/tokens/master/tokens';
export const TOKEN_ICON_API =
  'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/';

enum ActionTypes {
  GET_BALANCES_REQUEST = '@@dapps/Tokens/GET_BALANCES_REQUEST',
  GET_BALANCES_SUCCESS = '@@dapps/Tokens/GET_BALANCES_SUCCESS',
  GET_BALANCES_FAILURE = '@@dapps/Tokens/GET_BALANCES_FAILURE',

  GET_PRICES_REQUEST = '@@dapps/Tokens/GET_PRICES_REQUEST',
  GET_PRICES_SUCCESS = '@@dapps/Tokens/GET_PRICES_SUCCESS',
  GET_PRICES_FAILURE = '@@dapps/Tokens/GET_PRICES_FAILURE',
}

export default ActionTypes;
