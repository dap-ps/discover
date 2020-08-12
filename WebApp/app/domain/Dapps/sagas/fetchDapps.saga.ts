import { fetchDappsAction } from "../actions";
import DiscoverContract from '../../../embarkArtifacts/contracts/Discover'
import { take, put, call, fork, select } from "redux-saga/effects";
import { connectContract } from "domain/App/blockchainContext";
import { IDapp } from "../types";
import { selectCurrentAccount } from "domain/App/selectors";

export function* fetchDappsSaga() {
  try {
    const account = yield select(selectCurrentAccount)

    const DiscoverInstance = yield call(async () => await connectContract(DiscoverContract))
    const contractDappsCount: number = yield call(async () => await DiscoverInstance.methods
      .getDAppsCount()
      .call({ from: account })
    )
    
    const dapps: IDapp = yield call(
      async () =>
      await Promise.all([...(new Array(contractDappsCount)).fill('').map((id: number) => DiscoverInstance.methods.dapps(id).call({from: account}))])
    )
    console.log(dapps)
    debugger

    // if (account == constants.AddressZero) {
    //   yield put(connectAccountAction.request())
    //   const dapps = yield call(async () => await fetchAllDappsDB())
    //   console.log(dapps)
    //   debugger
    // } else {
    //   const DiscoverInstance = yield call(async () => await connectContract(DiscoverContract))
    //   debugger
    //   console.log((new Array(3)).fill('').length)
    //   console.log((new Array(3)).fill('').map((item, index) => console.log(item, index)))
    //   console.log((new Array(0)).fill('').length)
    //   console.log((new Array(0)).fill('').map((item, index) => console.log(item, index)))
    //   debugger
    //   const contractDappsCount: number = yield call(async () => await DiscoverInstance.methods
    //     .getDAppsCount()
    //     .call({ from: account })
    //   )
    //   debugger
      
    //   const dapps: IDapp = yield call(
    //     async () =>
    //     await Promise.all([...(new Array(contractDappsCount)).fill('').map((id: number) => DiscoverInstance.methods.dapps(id).call({from: account}))])
    //   )
    //   console.log(dapps)
    //   debugger
    // }
  }
  catch (error) {
    debugger
    // TODO  Network check
    yield put(fetchDappsAction.failure(error))
  }
}

export function* fetchDappsListener() {
  while (true) {
    yield take(fetchDappsAction.request)
    yield fork(fetchDappsSaga)
  }
}
