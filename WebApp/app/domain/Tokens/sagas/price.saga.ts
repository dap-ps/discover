import cc from 'cryptocompare';
import { take, call, fork, put, select } from 'redux-saga/effects';
import { getPricesAction } from '../actions';
import { TokenPriceData, IDAppsToken } from '../types';
import { RootState } from 'domain/App/types';

function* resolvePricesSaga() {
  while (true) {
    yield take(getPricesAction.request);
    const tokens: string[] = yield select((state: RootState) =>
      state.token.tokens.map((token: IDAppsToken) => token.symbol),
    );
    try {
      let prices: TokenPriceData = {};

      if (tokens.length > 65) {
        const requests = Math.ceil(tokens.length / 65);
        for (let i = 0; i < requests; i++) {
          prices = {
            ...prices,
            ...(yield call(
              async () =>
                await cc.priceMulti(tokens.slice(i * 65, (i + 1) * 65), [
                  'SNT',
                ]),
            )),
          };
        }
      } else {
        prices = yield call(async () => await cc.priceMulti(tokens, ['SNT']));
      }

      yield put(
        getPricesAction.success({ ...prices, WETH: { ...prices['ETH'] } }),
      );
    } catch (error) {
      console.error(error);
      yield put(getPricesAction.failure(error));
    }
  }
}

export function* PriceSaga() {
  yield fork(resolvePricesSaga);
}
