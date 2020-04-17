import { ERC20Token } from "./types";

export const initialTokens: ERC20Token[] = [
  {
    name: "Ether",
    address: "0x..."
    decimals: 18,
    allowance: 0, // Need to get max from ethers
    balance: 0,
    totalSupply: 0
  },
  {
    name: "SNT",
    address: "0x...",
    decimals: 18,
    allowance: 0, // Need to get max from ethers
    balance: 0,
    totalSupply: 0
  }
]
