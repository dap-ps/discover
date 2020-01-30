if (!process.env.WALLET_MNEMONIC) {
  throw Error('Env variable WALLET_MNEMONIC not defined!')
}

module.exports = {
  default: {
    enabled: true,
    accounts: [
      {
        mnemonic: process.env.WALLET_MNEMONIC,
        hdpath: process.env.HD_PATH, // If undefined, it will default to the default hd path
        balance: '1534983463450 ether',
      },
    ],
  },

  development: {
    networkType: 'testnet',
    endpoint: `https://ropsten.infura.io/v3/8675214b97b44e96b70d05326c61fd6a`,
  },

  testnet: {
    networkType: 'testnet',
    endpoint: `https://ropsten.infura.io/v3/8675214b97b44e96b70d05326c61fd6a`,
  },

  livenet: {
    endpoint: `https://mainnet.infura.io/v3/8675214b97b44e96b70d05326c61fd6a`,
  },
}
