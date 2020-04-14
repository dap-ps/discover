// import { call, select } from "redux-saga/effects";
// import { ApplicationRootState } from "types";
// import { ethers, Wallet } from "ethers";
// import { blockchainContext } from "domain/App/blockchainContext";
import { utils } from "ethers";
import ERC20Token from "../../embarkArtifacts/contracts/ERC20Token.js";

export function* getTokenContract() {
  // const tokenAddress = yield select((state: ApplicationRootState) => state.erc20.tokenAddress);
  // const signer: Wallet = yield call(async () => await blockchainContext.library?.getSigner());
  console.log(ERC20Token)
  debugger;

  return ERC20Token;
  // return yield call(async () => await new ethers.Contract(tokenAddress, JSON.stringify(abi), signer));
}

export const BNToNumber = (value: utils.BigNumber, decimals: number = 18) => {
  return parseFloat(utils.formatUnits(value, decimals));
}

export const numberToBN = (value: number, decimals: number = 18) => {
  return utils.parseUnits(`${value}`, decimals);
}
