/*global web3*/

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const checksumAddress = address => web3.utils.toChecksumAddress(address)
