import SNTContract from '../../../embarkArtifacts/contracts/MiniMeToken';
import { connectContract, getAccount, broadcastContractFn } from 'domain/App/blockchainContext';
import { AddressZero } from 'ethers/constants';
import { BigNumber, bigNumberify } from 'ethers/utils';



// View functions will just use address zero
export const SNTallowance = async (from: string, to: string) => {
  debugger
  const SNTToken = await connectContract(SNTContract, process.env.SNT_ADDRESS)
  
  return await SNTToken.methods
    .allowance(from, to)
    .call({ from: AddressZero })
}

export const SNTbalanceOf = async (account: string) => {
  debugger
  const SNTToken = await connectContract(SNTContract, process.env.SNT_ADDRESS)
  return await SNTToken.methods
    .balanceOf(account)
    .call({ from: AddressZero })
}

export const SNTcontroller = async () => {
  debugger
  const SNTToken = await connectContract(SNTContract, process.env.SNT_ADDRESS)
  return await SNTToken.methods
    .controller()
    .call({ from: AddressZero })
}

export const SNTtransferable = async () => {
  debugger
  const SNTToken = await connectContract(SNTContract, process.env.SNT_ADDRESS)
  return await SNTToken.methods
    .transfersEnabled()
    .call({ from: AddressZero })
}


export const validateSNTTransferFrom = async (amount: BigNumber): Promise<boolean> => {
  const account: string = await getAccount()
  if (account == AddressZero) {
    throw 'Account not connected'
  }

  const userBalance = await SNTbalanceOf(account)

  return bigNumberify(userBalance).gt(amount)
}

export const validateApproveAndCall = async(amount: BigNumber): Promise<boolean> => {
  const isTransferableToken = await SNTtransferable()
  if (!isTransferableToken) {
    throw new Error('Token is not transferable')
  }

  return await validateSNTTransferFrom(amount)
}


export const SNTapproveAndCall = async (spender: string, amount: BigNumber, callData: any) => {
  const account: string = await getAccount()
  if (account == AddressZero) {
    throw 'Account not connected'
  }
  const SNTToken = await connectContract(SNTContract, process.env.SNT_ADDRESS)
  if (await validateApproveAndCall(amount)) {
    return await broadcastContractFn(
      SNTToken.methods.approveAndCall(
        spender,
        amount.toString(),
        callData,
      ),
      account,
    )
  } else {
    throw 'Balance insufficent'
  }
  
}

// This is for testing purpose only
export const SNTgenerateTokens = async () => {
  const account: string = await getAccount()
  if (account == AddressZero) {
    throw 'Account not connected'
  }
  const SNTToken = await connectContract(SNTContract, process.env.SNT_ADDRESS)

  await SNTToken.methods
    .generateTokens(account, 10000)
    .send({ from: account })
}