// This file is just a stub showing a sample Api request saga.
// For more information on Saga see: https://redux-saga.js.org/

import { fork } from 'redux-saga/effects';
import { CurrenciesSaga } from './sagas/currencies.saga';
import { PriceSaga } from './sagas/price.saga';

export default function* TokensSaga() {
  yield fork(CurrenciesSaga);
  yield fork(PriceSaga);
}
