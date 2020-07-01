import { Reducer, Store } from 'redux';
import { DomainState as AppState } from '../domain/App/types';
import { DomainState as DappsState } from '../domain/Dapps/types';
import { DomainState as TokensState } from '../domain/Tokens/types';
import { DomainState as WalletState } from '../domain/Wallet/types';

export interface LifeStore extends Store<{}> {
  injectedReducers: any;
  injectedSagas: any;
  runSaga(
    saga: (() => IterableIterator<any>) | undefined,
    args: any | undefined,
  ): any;
  [Symbol.observable](): Observable<S>;
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

export interface InjectSagaParams {
  key: keyof ApplicationRootState;
  saga: () => IterableIterator<any>;
  mode?: string | undefined;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly global: AppState;
  readonly wallet: WalletState;
  readonly dapp: DappsState;
  readonly token: TokensState;
}
