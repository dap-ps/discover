if (process.env.WALLET_PASSWORD == undefined) {
  throw Error('Env variable WALLET_PASSWORD not defined!')
}

module.exports = {
  // applies to all environments
  default: {
    enabled: true,
    rpcHost: 'localhost', // HTTP-RPC server listening interface (default: "localhost")
    rpcPort: 8545, // HTTP-RPC server listening port (default: 8545)
    rpcCorsDomain: {
      // Domains from which to accept cross origin requests (browser enforced). This can also be a comma separated list
      auto: true, // When "auto" is true, Embark will automatically set the cors to the address of the webserver
      additionalCors: [], // Additional CORS domains to add to the list. If "auto" is false, only those will be added
    },
    wsRPC: true, // Enable the WS-RPC server
    wsOrigins: {
      // Same thing as "rpcCorsDomain", but for WS origins
      auto: true,
      additionalCors: [],
    },
    wsHost: 'localhost', // WS-RPC server listening interface (default: "localhost")
    wsPort: 8546, // WS-RPC server listening port (default: 8546)

    // Accounts to use as node accounts
    // The order here corresponds to the order of `web3.eth.getAccounts`, so the first one is the `defaultAccount`
    // accounts: [
    // {
    //   nodeAccounts: true, // Accounts use for the node
    //   numAddresses: '1', // Number of addresses/accounts (defaults to 1)
    //   password: 'config/development/password', // Password file for the accounts
    // },
    // Below are additional accounts that will count as `nodeAccounts` in the `deployment` section of your contract config
    // Those will not be unlocked in the node itself
    // {
    //   privateKeyFile: 'path/to/file', // Either a keystore or a list of keys, separated by , or ;
    //   password: 'passwordForTheKeystore', // Needed to decrypt the keystore file
    // },
    // {
    //   mnemonic: '12 word mnemonic',
    //   addressIndex: '0', // Optional. The index to start getting the address
    //   numAddresses: '1', // Optional. The number of addresses to get
    //   hdpath: "m/44'/60'/0'/0/", // Optional. HD derivation path
    // },
    // ],
  },

  // default environment, merges with the settings in default
  // assumed to be the intended environment by `embark run` and `embark blockchain`
  development: {
    networkType: 'testnet',
    syncMode: 'light',
    accounts: [
      {
        nodeAccounts: true,
        password: process.env.WALLET_PASSWORD,
      },
    ],
  },

  // merges with the settings in default
  // used with "embark run privatenet" and/or "embark blockchain privatenet"
  privatenet: {
    networkType: 'custom',
    networkId: 1337,
    isDev: false,
    datadir: '.embark/privatenet/datadir',
    // -- mineWhenNeeded --
    // This options is only valid when isDev is false.
    // Enabling this option uses our custom script to mine only when needed.
    // Embark creates a development account for you (using `geth account new`) and funds the account. This account can be used for
    // development (and even imported in to MetaMask). To enable correct usage, a password for this account must be specified
    // in the `account > password` setting below.
    // NOTE: once `mineWhenNeeded` is enabled, you must run an `embark reset` on your dApp before running
    // `embark blockchain` or `embark run` for the first time.
    mineWhenNeeded: true,
    // -- genesisBlock --
    // This option is only valid when mineWhenNeeded is true (which is only valid if isDev is false).
    // When enabled, geth uses POW to mine transactions as it would normally, instead of using POA as it does in --dev mode.
    // On the first `embark blockchain or embark run` after this option is enabled, geth will create a new chain with a
    // genesis block, which can be configured using the `genesisBlock` configuration option below.
    genesisBlock: 'config/privatenet/genesis.json', // Genesis block to initiate on first creation of a development node
    nodiscover: true,
    maxpeers: 0,
    proxy: true,
    accounts: [
      {
        nodeAccounts: true,
        password: 'config/privatenet/password', // Password to unlock the account
      },
    ],
    targetGasLimit: 8000000,
    simulatorBlocktime: 0,
  },

  privateparitynet: {
    ethereumClientName: 'parity',
    networkType: 'custom',
    networkId: 1337,
    isDev: false,
    genesisBlock: 'config/privatenet/genesis-parity.json', // Genesis block to initiate on first creation of a development node
    datadir: '.embark/privatenet/datadir',
    mineWhenNeeded: false,
    nodiscover: true,
    maxpeers: 0,
    proxy: true,
    accounts: [
      {
        nodeAccounts: true,
        password: 'config/privatenet/password',
      },
    ],
    targetGasLimit: 8000000,
    simulatorBlocktime: 0,
  },

  // merges with the settings in default
  // used with "embark run testnet" and/or "embark blockchain testnet"
  testnet: {
    networkType: 'testnet',
    syncMode: 'light',
    accounts: [
      {
        nodeAccounts: true,
        password: process.env.WALLET_PASSWORD,
      },
    ],
  },

  // merges with the settings in default
  // used with "embark run livenet" and/or "embark blockchain livenet"
  livenet: {
    networkType: 'livenet',
    syncMode: 'light',
    rpcCorsDomain: 'http://localhost:8000',
    wsOrigins: 'http://localhost:8000',
    accounts: [
      {
        nodeAccounts: true,
        password: process.env.WALLET_PASSWORD,
      },
    ],
  },

  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  // custom_name: {
  // }
}
