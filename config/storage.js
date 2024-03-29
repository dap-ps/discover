module.exports = {
  // default applies to all environments
  default: {
    enabled: true,
    ipfs_bin: 'ipfs',
    provider: 'ipfs',
    available_providers: ['ipfs'],
    upload: {
      host: 'localhost',
      port: 5001,
    },
    dappConnection: [
      {
        provider: 'ipfs',
        host: 'localhost',
        port: 5001,
        getUrl: 'http://localhost:8080/ipfs/',
      },
    ],
    // Configuration to start Swarm in the same terminal as `embark run`
    /* ,account: {
      address: "YOUR_ACCOUNT_ADDRESS", // Address of account accessing Swarm
      password: "PATH/TO/PASSWORD/FILE" // File containing the password of the account
    },
    swarmPath: "PATH/TO/SWARM/EXECUTABLE" // Path to swarm executable (default: swarm) */
  },

  // default environment, merges with the settings in default
  // assumed to be the intended environment by `embark run`
  development: {
    enabled: true,
    ipfs_bin: 'ipfs',
    provider: 'ipfs',
    available_providers: ['ipfs'],
    upload: {
      host: 'localhost',
      port: 5001,
    },
    dappConnection: [
      {
        provider: 'ipfs',
        protocol: 'https',
        host: 'ipfs.status.im',
        port: 443,
        getUrl: 'https://ipfs.status.im/',
      },
    ],
  },

  // merges with the settings in default
  // used with "embark run testnet"
  testnet: {
    enabled: true,
    ipfs_bin: 'ipfs',
    provider: 'ipfs',
    available_providers: ['ipfs'],
    upload: {
      host: 'localhost',
      port: 5001,
    },
    dappConnection: [
      {
        provider: 'ipfs',
        protocol: 'https',
        host: 'ipfs.status.im',
        port: 443,
        getUrl: 'https://ipfs.status.im/',
      },
    ],
  },

  // merges with the settings in default
  // used with "embark run livenet"
  livenet: {
    enabled: true,
    ipfs_bin: 'ipfs',
    provider: 'ipfs',
    available_providers: ['ipfs'],
    upload: {
      host: 'localhost',
      port: 5001,
    },
    dappConnection: [
      {
        provider: 'ipfs',
        protocol: 'https',
        host: 'ipfs.status.im',
        port: 443,
        getUrl: 'https://ipfs.status.im/',
      },
    ],
  },
}
