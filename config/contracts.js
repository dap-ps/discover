const wallet = require('./development/mnemonic')

module.exports = {
  // default applies to all environments
  default: {
    // Blockchain node to deploy the contracts
    deployment: {
      host: 'localhost', // Host of the blockchain node
      port: 8545, // Port of the blockchain node
      type: 'rpc', // Type of connection (ws or rpc),
      // Accounts to use instead of the default account to populate your wallet
      // The order here corresponds to the order of `web3.eth.getAccounts`, so the first one is the `defaultAccount`
      /* ,accounts: [
        {
          privateKey: "your_private_key",
          balance: "5 ether"  // You can set the balance of the account in the dev environment
                              // Balances are in Wei, but you can specify the unit with its name
        },
        {
          privateKeyFile: "path/to/file", // Either a keystore or a list of keys, separated by , or ;
          password: "passwordForTheKeystore" // Needed to decrypt the keystore file
        },
        {
          mnemonic: "12 word mnemonic",
          addressIndex: "0", // Optional. The index to start getting the address
          numAddresses: "1", // Optional. The number of addresses to get
          hdpath: "m/44'/60'/0'/0/" // Optional. HD derivation path
        },
        {
          "nodeAccounts": true // Uses the Ethereum node's accounts
        }
      ] */

      accounts: [
        {
          mnemonic: wallet.mnemonic,
          balance: '1534983463450 ether',
        },
      ],
    },
    // order of connections the dapp should connect to
    // dappConnection: [
    //   '$WEB3', // uses pre existing web3 object if available (e.g in Mist)
    //   'ws://localhost:8546',
    //   'http://localhost:8545',
    // ],

    // Automatically call `ethereum.enable` if true.
    // If false, the following code must run before sending any transaction: `await EmbarkJS.enableEthereum();`
    // Default value is true.
    dappAutoEnable: false,

    gas: 'auto',

    // Strategy for the deployment of the contracts:
    // - implicit will try to deploy all the contracts located inside the contracts directory
    //            or the directory configured for the location of the contracts. This is default one
    //            when not specified
    // - explicit will only attempt to deploy the contracts that are explicitly specified inside the
    //            contracts section.
    // strategy: 'implicit',

    // contracts: {
    //   Discover: {
    //     args: { _SNT: '0x744d70fdbe2ba4cf95131626614a1763df805b9e' },
    //   },
    //   MiniMeToken: { deploy: false },
    //   TestBancorFormula: { deploy: false },
    // },

    contracts: {
      BancorFormula: { deploy: false },
      MiniMeTokenFactory: { deploy: false },
      SafeMath: { deploy: false },
      TestBancorFormula: { deploy: false },
      MiniMeToken: {
        address: '0x25B1bD06fBfC2CbDbFc174e10f1B78b1c91cc77B'
      },
      Discover: { address: '0xd34aae5b764d720ba5b438b29d60e5e9601cf3a9' },
      // MiniMeToken: {
      //   args: [
      //     '$MiniMeTokenFactory',
      //     '0x0000000000000000000000000000000000000000',
      //     0,
      //     'SNTMiniMeToken',
      //     18,
      //     'SNT',
      //     true,
      //   ],
      // },
      // Discover: {
      //   args: ['$MiniMeToken'],
      // },
    },
  },

  // default environment, merges with the settings in default
  // assumed to be the intended environment by `embark run`
  development: {
    dappConnection: [
      'ws://localhost:8546',
      'http://localhost:8545',
      '$WEB3', // uses pre existing web3 object if available (e.g in Mist)
    ],
  },

  // merges with the settings in default
  // used with "embark run privatenet"
  privatenet: {},

  // merges with the settings in default
  // used with "embark run testnet"
  testnet: {
    deployment: {
      accounts: [{
        mnemonic: wallet.mnemonic,
      }],
      host: `ropsten.infura.io/v3/8675214b97b44e96b70d05326c61fd6a`,
      port: false,
      type: 'rpc',
      protocol: 'https',
    },
    dappConnection: [
      '$WEB3',
      'https://ropsten.infura.io/v3/8675214b97b44e96b70d05326c61fd6a',
    ],
    dappAutoEnable: false
  },

  // merges with the settings in default
  // used with "embark run livenet"
  livenet: {},

  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  // custom_name: {
  // }
}
