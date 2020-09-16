import { connectContract } from "domain/App/blockchainUtils";

// The minimum ABI to get ERC20 Token balance
const ERC20minABI = [
  // balanceOf
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
  // decimals
  {
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
  }
];

export const ERC20Decimals = async (account: string, contractAddress: string) => {
  const ERC20Contract = await connectContract(
    ERC20minABI,
    contractAddress,
  );

  return await ERC20Contract.decimals()
}


export const ERC20BalanceOf = async (account: string, contractAddress: string) => {
  const ERC20Contract = await connectContract(
    ERC20minABI,
    contractAddress,
  );

  return await ERC20Contract.balanceOf(account)
}
