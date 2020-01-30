module.exports = {
  default: {
    dappAutoEnable: false,

    gas: 'auto',
    gasPrice: '10000000000', // 10gwei. TODO: Set a proper gas price for deployment. See ethgasstation.info

    strategy: 'explicit',

    deploy: {
      Discover: {
        args: ['$MiniMeToken'],
      },
    },
  },

  development: {
    dappConnection: [
      '$WEB3',
      'https://ropsten.infura.io/v3/8675214b97b44e96b70d05326c61fd6a',
    ],
    deploy: {
      MiniMeToken: {
        address: '0xc55cf4b03948d7ebc8b9e8bad92643703811d162',
      },
    },
    tracking: 'shared.development.chains.json',
  },

  testnet: {
    dappConnection: [
      '$WEB3',
      'https://ropsten.infura.io/v3/8675214b97b44e96b70d05326c61fd6a',
    ],
    deploy: {
      MiniMeTokenFactory: {
        deploy: false,
      },
      MiniMeToken: {
        address: '0xc55cf4b03948d7ebc8b9e8bad92643703811d162',
      },
      Discover: {
        address: '0xC8d48B421eAFdD75d5144E8f06882Cb5F0746Bd2',
      },
    },
    tracking: 'shared.testnet.chains.json',
  },

  livenet: {
    dappConnection: [
      '$WEB3',
      'https://mainnet.infura.io/v3/8675214b97b44e96b70d05326c61fd6a',
    ],
    deploy: {
      MiniMeTokenFactory: {
        deploy: false,
      },
      MiniMeToken: {
        address: '0x744d70fdbe2ba4cf95131626614a1763df805b9e', // Mainnet SNT address
      },
      Discover: {
        address: '0x5bCF2767F86f14eDd82053bfBfd5069F68C2C5F8',
      },
    },
    tracking: 'shared.mainnet.chains.json',
  },
}
