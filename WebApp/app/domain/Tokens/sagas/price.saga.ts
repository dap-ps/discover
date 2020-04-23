import cc from 'cryptocompare'
import { take, call, fork, put } from 'redux-saga/effects';
import { getPricesAction } from '../actions';
import { TokenPriceData } from '../types';

function* resolvePricesSaga() {
  while(true){
    const currencies = yield take(getPricesAction.request);
    try{
      let prices: TokenPriceData = {};

      if(currencies.length > 65){
        const requests = Math.ceil(currencies.length / 65);
        for(let i = 0; i < requests; i++){
          prices = {
            ...prices,
            ...(yield call(async () => await cc.priceMulti(currencies.slice((i * 65), ((i + 1) * 65)), ['SNT'])))
          }
        }

      }else {
        prices = yield call(async () => await cc.priceMulti(currencies, ['SNT']))
      }
      yield put(getPricesAction.success({ ...prices,  WETH: { ...prices['ETH'] } }))
    }catch(error){
      console.error(error)
      yield put(getPricesAction.failure(error))
    }
  }
}

export function* PriceSaga() {
  yield fork(resolvePricesSaga)
}
