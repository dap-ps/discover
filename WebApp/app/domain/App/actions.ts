import { createStandardAction } from 'typesafe-actions';
import ActionTypes from './constants';

export const setApiSendingFlag = createStandardAction(ActionTypes.SET_API_SENDING_FLAG)<boolean>();
export const setErrorMessageAction = createStandardAction(ActionTypes.SET_ERROR_MESSAGE)<string>();

export const connectWalletAction = createStandardAction(ActionTypes.CONNECT_WALLET)<void>();
export const disconnectWalletAction = createStandardAction(ActionTypes.DISCONNECT_WALLET)<void>();
export const setConnectedStateAction = createStandardAction(ActionTypes.SET_CONNECTED)<boolean>();
