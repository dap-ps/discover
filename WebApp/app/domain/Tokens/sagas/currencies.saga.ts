import { getBalancesAction, getPricesAction } from '../actions';
import { take, fork, call, put, select } from 'redux-saga/effects';
import { getKyberCurrencies, KyberERC20Token } from './kyber.saga';
import { getTokensBalance } from '@mycrypto/eth-scan';
import { RootState } from 'domain/App/types';
import { IDAppsToken } from '../types';
import { utils } from 'ethers';
import { ContractAddresses, getRpcUrl, getNetworkName } from 'domain/App/blockchainUtils';

function* getBalancesSaga() {
  while (true) {
    yield take(getBalancesAction.request);
    // TODO get network from provider
    try {
      const account = yield select(
        (state: RootState) => state.wallet.walletAddress,
      );
      const currencies: KyberERC20Token[] = yield call(
        getKyberCurrencies,
        getNetworkName(parseInt(process.env['TARGET_NETWORK'] as string)),
      );

      const tokenAddresses = currencies
        .filter((c) => c.symbol !== 'ETH')
        .map((c) => c.address);

      const fetchedBalances = yield call(
        async () =>
          await getTokensBalance(
            await getRpcUrl(undefined, true),
            account,
            [
              ...tokenAddresses,
              ContractAddresses[parseInt(process.env['TARGET_NETWORK'] as string)].SNT
            ],
          ),
      );

      let balances: IDAppsToken[] = Object.keys(fetchedBalances)
        .filter((key) => fetchedBalances[key].gt(0) || key.toLowerCase() == ContractAddresses[parseInt(process.env['TARGET_NETWORK'] as string)].SNT.toLowerCase())
        .map((tokenAddress) => {
          const target = currencies.filter(
            (cur) => cur.address.toLowerCase() == tokenAddress.toLowerCase(),
          )[0];

          if (tokenAddress.toLowerCase() == ContractAddresses[parseInt(process.env['TARGET_NETWORK'] as string)].SNT.toLowerCase()){
            return {
              address: tokenAddress,
              allowance: utils.bigNumberify(0),
              balance: fetchedBalances[tokenAddress],
              decimals: target ? target.decimals : 18,
              logo: '',
              name: target ? target.name : 'Status',
              price: 0,
              symbol: target ? target.symbol : 'SNT',
            };
          } else {
            return {
              address: tokenAddress,
              allowance: utils.bigNumberify(0),
              balance: fetchedBalances[tokenAddress],
              decimals: target ? target.decimals : 18,
              logo: '',
              name: target ? target.name : '',
              price: 0,
              symbol: target ? target.symbol : '',
            };
          }
          
        });

      yield put(getBalancesAction.success(balances));
      yield put(getPricesAction.request());
    } catch (error) {
      console.error(error);
      yield put(getBalancesAction.failure(error));
    }
  }
}

export function* CurrenciesSaga() {
  yield fork(getBalancesSaga);
}
