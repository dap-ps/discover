import { getBalancesAction } from "../actions";
import { take, fork, call, put, select } from "redux-saga/effects";
import { getKyberCurrencies, KyberERC20Token } from "./kyber.saga";
import { getTokensBalance } from '@mycrypto/eth-scan'
import { RootState } from "domain/App/types";
import { DAppsToken } from "../types";


function* getBalancesSaga(){
  while(true){
    yield take(getBalancesAction.request);
    // TODO get network from provider
    try{
      const account = yield select((state: RootState) => state.global.walletAddress);
      const currencies: KyberERC20Token[] = yield call(getKyberCurrencies, "mainnet")
      const tokenAddresses = currencies.filter(c => c.symbol !== 'ETH').map(c => c.address)

      // TODO: Provider fetched via Embark & Web3 throws invalid provider
      const fetchedBalances = (yield call(async () => await getTokensBalance(
        'https://api.mycryptoapi.com/eth',
        account,
        tokenAddresses,
      )))
      let balances: DAppsToken[] = Object.keys(fetchedBalances)
        .filter(key => fetchedBalances[key].gt(0))
        .map(tokenAddress => {
          const target = currencies.filter(cur => cur.address == tokenAddress)[0];
            return {
              address: tokenAddress,
              allowance: 0,
              balance: fetchedBalances[tokenAddress],
              decimals: target.decimals,
              logo: "",
              name: target.name,
              price: 0,
              symbol: target.symbol,
            }
        })
      debugger;
      yield put(getBalancesAction.success(balances))
    }catch(error){
      console.error(error)
      yield put(getBalancesAction.failure(error))
    }
  }
}

export function* CurrenciesSaga() {
  yield fork(getBalancesSaga);
}
