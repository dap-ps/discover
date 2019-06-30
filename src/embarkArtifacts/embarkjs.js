/* eslint-disable */

const EmbarkJS = require('embarkjs').default
export default EmbarkJS
global.EmbarkJS = EmbarkJS

const Web3 = global.__Web3 || require('web3')
global.Web3 = Web3 /*global Web3*/
const embarkJSConnectorWeb3 = {}

embarkJSConnectorWeb3.init = function(config) {
  global.web3 = config.web3 || global.web3
  // Check if the global web3 object uses the old web3 (0.x)
  if (global.web3 && typeof global.web3.version !== 'string') {
    // If so, use a new instance using 1.0, but use its provider
    this.web3 = new Web3(global.web3.currentProvider)
  } else {
    this.web3 = global.web3 || new Web3()
  }
  global.web3 = this.web3
}

embarkJSConnectorWeb3.getInstance = function() {
  return this.web3
}

embarkJSConnectorWeb3.getAccounts = function() {
  return this.web3.eth.getAccounts(...arguments)
}

embarkJSConnectorWeb3.getNewProvider = function(providerName, ...args) {
  return new Web3.providers[providerName](...args)
}

embarkJSConnectorWeb3.setProvider = function(provider) {
  return this.web3.setProvider(provider)
}

embarkJSConnectorWeb3.getCurrentProvider = function() {
  return this.web3.currentProvider
}

embarkJSConnectorWeb3.getDefaultAccount = function() {
  return this.web3.eth.defaultAccount
}

embarkJSConnectorWeb3.setDefaultAccount = function(account) {
  this.web3.eth.defaultAccount = account
}

embarkJSConnectorWeb3.newContract = function(options) {
  return new this.web3.eth.Contract(options.abi, options.address)
}

embarkJSConnectorWeb3.send = function() {
  return this.web3.eth.sendTransaction(...arguments)
}

embarkJSConnectorWeb3.toWei = function() {
  return this.web3.toWei(...arguments)
}

embarkJSConnectorWeb3.getNetworkId = function() {
  return this.web3.eth.net.getId()
}

EmbarkJS.Blockchain.registerProvider('web3', embarkJSConnectorWeb3)
EmbarkJS.Blockchain.setProvider('web3', {})
if (!global.__Web3) {
  const web3ConnectionConfig = require('/Users/georgispasov/Development/LimeLabs/status/discover/src/embarkArtifacts/config/blockchain.json')
  EmbarkJS.Blockchain.connect(web3ConnectionConfig, err => {
    if (err) {
      console.error(err)
    }
  })
}
const namehash =
  global.namehash ||
  require('/Users/georgispasov/Development/LimeLabs/status/discover/src/embarkArtifacts/modules/eth-ens-namehash')
;('use strict')

/*global namehash*/
// Price of ENS registration contract functions
const ENS_GAS_PRICE = 700000
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
const reverseAddressSuffix = '.addr.reverse'
const NoDecodeAddrErr = "Error: Couldn't decode address from ABI: 0x"
const NoDecodeStringErr =
  'ERROR: The returned value is not a convertible string: 0x0'

function registerSubDomain(
  web3,
  ens,
  registrar,
  resolver,
  defaultAccount,
  subdomain,
  rootDomain,
  reverseNode,
  address,
  logger,
  secureSend,
  callback,
  _namehash,
) {
  _namehash = _namehash || namehash

  const subnode = _namehash.hash(subdomain)

  const rootNode = _namehash.hash(rootDomain)

  const node = _namehash.hash(`${subdomain}.${rootDomain}`) // FIXME Registrar calls a function in ENS and in privatenet it doesn't work for soem reason
  // const toSend = registrar.methods.register(subnode, defaultAccount);

  const toSend = ens.methods.setSubnodeOwner(rootNode, subnode, defaultAccount)
  let transaction
  secureSend(
    web3,
    toSend,
    {
      from: defaultAccount,
      gas: ENS_GAS_PRICE,
    },
    false,
  ) // Set resolver for the node
    .then(transac => {
      if (
        transac.status !== '0x1' &&
        transac.status !== '0x01' &&
        transac.status !== true
      ) {
        logger.warn('Failed transaction', transac)
        return callback('Failed to register. Check gas cost.')
      }

      transaction = transac
      return secureSend(
        web3,
        ens.methods.setResolver(node, resolver.options.address),
        {
          from: defaultAccount,
          gas: ENS_GAS_PRICE,
        },
        false,
      )
    }) // Set address for node
    .then(_result => {
      return secureSend(
        web3,
        resolver.methods.setAddr(node, address),
        {
          from: defaultAccount,
          gas: ENS_GAS_PRICE,
        },
        false,
      )
    }) // Set resolver for the reverse node
    .then(_result => {
      return secureSend(
        web3,
        ens.methods.setResolver(reverseNode, resolver.options.address),
        {
          from: defaultAccount,
          gas: ENS_GAS_PRICE,
        },
        false,
      )
    }) // Set name for reverse node
    .then(_result => {
      return secureSend(
        web3,
        resolver.methods.setName(reverseNode, `${subdomain}.${rootDomain}`),
        {
          from: defaultAccount,
          gas: ENS_GAS_PRICE,
        },
        false,
      )
    })
    .then(_result => {
      callback(null, transaction)
    })
    .catch(err => {
      logger.error('Failed to register with error:', err.message || err)
      callback(err.message || err)
    })
}

function lookupAddress(address, ens, utils, createResolverContract, callback) {
  if (address.startsWith('0x')) {
    address = address.slice(2)
  }

  let node = utils.soliditySha3(address.toLowerCase() + reverseAddressSuffix)

  function cb(err, name) {
    if (err === NoDecodeStringErr || err === NoDecodeAddrErr) {
      return callback('Address does not resolve to name. Try syncing chain.')
    }

    return callback(err, name)
  }

  return ens.methods.resolver(node).call((err, resolverAddress) => {
    if (err) {
      return cb(err)
    }

    if (resolverAddress === ZERO_ADDRESS) {
      return cb('Address not associated to a resolver')
    }

    createResolverContract(resolverAddress, (_, resolverContract) => {
      resolverContract.methods.name(node).call(cb)
    })
  })
}

function resolveName(name, ens, createResolverContract, callback, _namehash) {
  _namehash = _namehash || namehash

  let node = _namehash.hash(name)

  function cb(err, addr) {
    if (err === NoDecodeAddrErr) {
      return callback(name + ' is not registered', '0x')
    }

    callback(err, addr)
  }

  return ens.methods.resolver(node).call((err, resolverAddress) => {
    if (err) {
      return cb(err)
    }

    if (resolverAddress === ZERO_ADDRESS) {
      return cb('Name not yet registered')
    }

    createResolverContract(resolverAddress, (_, resolverContract) => {
      resolverContract.methods.addr(node).call(cb)
    })
  })
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    registerSubDomain,
    resolveName,
    lookupAddress,
  }
}
//# sourceMappingURL=ENSFunctions.js.map
;('use strict')

/* global EmbarkJS Web3 namehash registerSubDomain require */
const __embarkENS = {} // resolver interface

__embarkENS.resolverInterface = [
  {
    constant: true,
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'addr',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'content',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
      },
      {
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'setAddr',
    outputs: [],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
      },
      {
        name: 'hash',
        type: 'bytes32',
      },
    ],
    name: 'setContent',
    outputs: [],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
      },
      {
        name: 'name',
        type: 'string',
      },
    ],
    name: 'setName',
    outputs: [],
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
      },
      {
        name: 'contentType',
        type: 'uint256',
      },
    ],
    name: 'ABI',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
      {
        name: '',
        type: 'bytes',
      },
    ],
    payable: false,
    type: 'function',
  },
]
const defaultAccountNotSetError = 'web3.eth.defaultAccount not set'
const providerNotSetError = 'ENS provider not set'
const NoDecodeAddrError = "Error: Couldn't decode address from ABI: 0x"
const NoDecodeStringError =
  'ERROR: The returned value is not a convertible string: 0x0'
const reverseAddrSuffix = '.addr.reverse'
const voidAddress = '0x0000000000000000000000000000000000000000'
__embarkENS.registryAddresses = {
  // Mainnet
  '1': '0x314159265dd8dbb310642f98f50c066173c1259b',
  // Ropsten
  '3': '0x112234455c3a32fd11230c42e7bccd4a84e02010',
  // Rinkeby
  '4': '0xe7410170f87102DF0055eB195163A03B7F2Bff4A',
}

__embarkENS.setProvider = function(config) {
  const self = this
  const ERROR_MESSAGE = 'ENS is not available in this chain'
  self.registration = config.registration
  self.env = config.env
  EmbarkJS.onReady(() => {
    EmbarkJS.Blockchain.blockchainConnector
      .getNetworkId()
      .then(id => {
        const registryAddress =
          self.registryAddresses[id] || config.registryAddress
        self._isAvailable = true
        self.ens = new EmbarkJS.Blockchain.Contract({
          abi: config.registryAbi,
          address: registryAddress,
          web3: EmbarkJS.Blockchain.blockchainConnector.getInstance(),
        })
        self.registrar = new EmbarkJS.Blockchain.Contract({
          abi: config.registrarAbi,
          address: config.registrarAddress,
          web3: EmbarkJS.Blockchain.blockchainConnector.getInstance(),
        })
        self.resolver = new EmbarkJS.Blockchain.Contract({
          abi: config.resolverAbi,
          address: config.resolverAddress,
          web3: EmbarkJS.Blockchain.blockchainConnector.getInstance(),
        })
      })
      .catch(err => {
        if (err.message.indexOf('Provider not set or invalid') > -1) {
          console.warn(ERROR_MESSAGE)
          return
        }

        console.error(err)
      })
  })
}

__embarkENS.resolve = function(name, callback) {
  const resolve = async name => {
    if (!this.ens) {
      throw new Error(providerNotSetError)
    }

    if (!EmbarkJS.Blockchain.blockchainConnector.getDefaultAccount()) {
      throw new Error(defaultAccountNotSetError)
    }

    let node = namehash.hash(name)

    try {
      const resolvedAddress = await this.ens.methods.resolver(node).call()

      if (resolvedAddress === voidAddress) {
        throw new Error('Name not yet registered')
      }

      const resolverContract = new EmbarkJS.Blockchain.Contract({
        abi: this.resolverInterface,
        address: resolvedAddress,
        web3: EmbarkJS.Blockchain.blockchainConnector.getInstance(),
      })
      return await resolverContract.methods.addr(node).call()
    } catch (err) {
      const msg = err.message

      if (msg === NoDecodeAddrError) {
        throw new Error(`${name} is not registered`)
      }

      throw err
    }
  }

  if (callback) {
    resolve(name)
      .then(result => {
        callback(null, result)
      })
      .catch(callback)
    return
  }

  return resolve(name)
}

__embarkENS.lookup = function(address, callback) {
  const lookup = async address => {
    if (!this.ens) {
      throw new Error(providerNotSetError)
    }

    if (!EmbarkJS.Blockchain.blockchainConnector.getDefaultAccount()) {
      throw new Error(defaultAccountNotSetError)
    }

    if (address.startsWith('0x')) {
      address = address.slice(2)
    }

    let node = Web3.utils.soliditySha3(
      address.toLowerCase() + reverseAddrSuffix,
    )

    try {
      const resolverAddress = await this.ens.methods.resolver(node).call()

      if (resolverAddress === voidAddress) {
        throw new Error('Address not associated to a resolver')
      }

      const resolverContract = new EmbarkJS.Blockchain.Contract({
        abi: this.resolverInterface,
        address: resolverAddress,
        web3: EmbarkJS.Blockchain.blockchainConnector.getInstance(),
      })
      return await resolverContract.methods.name(node).call()
    } catch (err) {
      const msg = err.message

      if (msg === NoDecodeStringError || msg === NoDecodeAddrError) {
        throw new Error('Address does not resolve to name. Try syncing chain.')
      }

      throw err
    }
  }

  if (callback) {
    lookup(address)
      .then(result => {
        callback(null, result)
      })
      .catch(callback)
    return
  }

  return lookup(address)
}

__embarkENS.registerSubDomain = function(name, address, callback) {
  callback = callback || function() {}

  if (!EmbarkJS.Blockchain.blockchainConnector.getDefaultAccount()) {
    return callback(defaultAccountNotSetError)
  }

  if (this.env !== 'development' && this.env !== 'privatenet') {
    return callback(
      'Sub-domain registration is only available in development or privatenet mode',
    )
  }

  if (!this.registration || !this.registration.rootDomain) {
    return callback(
      'No rootDomain is declared in config/namesystem.js (register.rootDomain). Unable to register a subdomain until then.',
    )
  }

  if (!address || !Web3.utils.isAddress(address)) {
    return callback('You need to specify a valid address for the subdomain')
  } // Register function generated by the index

  registerSubDomain(
    EmbarkJS.Blockchain.blockchainConnector.getInstance(),
    this.ens,
    this.registrar,
    this.resolver,
    EmbarkJS.Blockchain.blockchainConnector.getDefaultAccount(),
    name,
    this.registration.rootDomain,
    Web3.utils.soliditySha3(
      address.toLowerCase().substr(2) + reverseAddrSuffix,
    ),
    address,
    console,
    EmbarkJS.Utils.secureSend,
    (err, result) => {
      if (err && err.indexOf('Transaction has been reverted by the EVM') > -1) {
        return callback(
          'Registration was rejected. Are you the owner of the root domain?',
        )
      }

      callback(err, result)
    },
  )
}

__embarkENS.isAvailable = function() {
  return Boolean(this._isAvailable)
}
//# sourceMappingURL=embarkjs.js.map
EmbarkJS.Names.registerProvider('ens', __embarkENS)
const IpfsApi = global.IpfsApi || require('ipfs-api')
;('use strict')

var _interopRequireDefault = require('@babel/runtime-corejs2/helpers/interopRequireDefault')

var _promise = _interopRequireDefault(
  require('@babel/runtime-corejs2/core-js/promise'),
)

/*global IpfsApi*/
const __embarkIPFS = {}
const NoConnectionError =
  'No IPFS connection. Please ensure to call Embark.Storage.setProvider()'

__embarkIPFS.setProvider = function(options) {
  const self = this
  return new _promise.default(function(resolve, reject) {
    try {
      if (!options) {
        self._config = options
        self._ipfsConnection = IpfsApi('localhost', '5001')
        self._getUrl = 'http://localhost:8080/ipfs/'
      } else {
        const ipfsOptions = {
          host: options.host || options.server,
          protocol: 'http',
        }

        if (options.protocol) {
          ipfsOptions.protocol = options.protocol
        }

        if (options.port && options.port !== 'false') {
          ipfsOptions.port = options.port
        }

        self._ipfsConnection = IpfsApi(ipfsOptions)
        self._getUrl = options.getUrl || 'http://localhost:8080/ipfs/'
      }

      resolve(self)
    } catch (err) {
      console.error(err)
      self._ipfsConnection = null
      reject(new Error('Failed to connect to IPFS'))
    }
  })
}

__embarkIPFS.isAvailable = function() {
  return new _promise.default(resolve => {
    if (!this._ipfsConnection) {
      return resolve(false)
    }

    this._ipfsConnection
      .version()
      .then(id => {
        resolve(Boolean(id))
      })
      .catch(err => {
        console.error(err)
        resolve(false)
      })
  })
}

__embarkIPFS.saveText = function(text) {
  const self = this
  return new _promise.default(function(resolve, reject) {
    if (!self._ipfsConnection) {
      return reject(new Error(NoConnectionError))
    }

    self._ipfsConnection.add(self._ipfsConnection.Buffer.from(text), function(
      err,
      result,
    ) {
      if (err) {
        return reject(err)
      }

      resolve(result[0].path)
    })
  })
}

__embarkIPFS.get = function(hash) {
  const self = this // TODO: detect type, then convert if needed
  //var ipfsHash = web3.toAscii(hash);

  return new _promise.default(function(resolve, reject) {
    if (!self._ipfsConnection) {
      var connectionError = new Error(NoConnectionError)
      return reject(connectionError)
    }

    self._ipfsConnection.get(hash, function(err, files) {
      if (err) {
        return reject(err)
      }

      resolve(files[0].content.toString())
    })
  })
}

__embarkIPFS.uploadFile = function(inputSelector) {
  const self = this
  const file = inputSelector[0].files[0]

  if (file === undefined) {
    throw new Error('no file found')
  }

  return new _promise.default(function(resolve, reject) {
    if (!self._ipfsConnection) {
      return reject(new Error(NoConnectionError))
    }

    const reader = new FileReader()

    reader.onloadend = function() {
      const buffer = self._ipfsConnection.Buffer.from(reader.result)

      self._ipfsConnection.add(buffer, function(err, result) {
        if (err) {
          return reject(err)
        }

        resolve(result[0].path)
      })
    }

    reader.readAsArrayBuffer(file)
  })
}

__embarkIPFS.getUrl = function(hash) {
  return (this._getUrl || 'http://localhost:8080/ipfs/') + hash
}

__embarkIPFS.resolve = function(name, callback) {
  callback = callback || function() {}

  if (!this._ipfsConnection) {
    return callback(new Error(NoConnectionError))
  }

  this._ipfsConnection.name
    .resolve(name)
    .then(res => {
      callback(null, res.Path)
    })
    .catch(() => {
      callback(name + ' is not registered')
    })
}

__embarkIPFS.register = function(addr, callback) {
  callback = callback || function() {}

  if (!this._ipfsConnection) {
    return new Error(NoConnectionError)
  }

  if (addr.length !== 46 || !addr.startsWith('Qm')) {
    return callback('String is not an IPFS hash')
  }

  this._ipfsConnection.name
    .publish('/ipfs/' + addr)
    .then(res => {
      callback(null, res.Name)
    })
    .catch(() => {
      callback(addr + ' could not be registered')
    })
}
//# sourceMappingURL=embarkjs.js.map
EmbarkJS.Storage.registerProvider('ipfs', __embarkIPFS)
var whenEnvIsLoaded = function(cb) {
  if (
    typeof document !== 'undefined' &&
    document !== null &&
    !/comp|inter|loaded/.test(document.readyState)
  ) {
    document.addEventListener('DOMContentLoaded', cb)
  } else {
    cb()
  }
}

var whenEnvIsLoaded = function(cb) {
  if (
    typeof document !== 'undefined' &&
    document !== null &&
    !/comp|inter|loaded/.test(document.readyState)
  ) {
    document.addEventListener('DOMContentLoaded', cb)
  } else {
    cb()
  }
}
whenEnvIsLoaded(function() {
  EmbarkJS.Storage.setProviders([
    {
      provider: 'ipfs',
      protocol: 'https',
      host: 'ipfs.infura.io',
      port: 5001,
      getUrl: 'https://ipfs.infura.io/ipfs/',
    },
  ])
})

var whenEnvIsLoaded = function(cb) {
  if (
    typeof document !== 'undefined' &&
    document !== null &&
    !/comp|inter|loaded/.test(document.readyState)
  ) {
    document.addEventListener('DOMContentLoaded', cb)
  } else {
    cb()
  }
}
whenEnvIsLoaded(function() {
  EmbarkJS.Names.setProvider('ens', {
    env: 'testnet',
    registration: {},
    registryAbi: [
      {
        constant: true,
        inputs: [{ name: 'node', type: 'bytes32' }],
        name: 'resolver',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ name: 'node', type: 'bytes32' }],
        name: 'owner',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'node', type: 'bytes32' },
          { name: 'label', type: 'bytes32' },
          { name: 'owner', type: 'address' },
        ],
        name: 'setSubnodeOwner',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'node', type: 'bytes32' },
          { name: 'ttl', type: 'uint64' },
        ],
        name: 'setTTL',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ name: 'node', type: 'bytes32' }],
        name: 'ttl',
        outputs: [{ name: '', type: 'uint64' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'node', type: 'bytes32' },
          { name: 'resolver', type: 'address' },
        ],
        name: 'setResolver',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'node', type: 'bytes32' },
          { name: 'owner', type: 'address' },
        ],
        name: 'setOwner',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'node', type: 'bytes32' },
          { indexed: true, name: 'label', type: 'bytes32' },
          { indexed: false, name: 'owner', type: 'address' },
        ],
        name: 'NewOwner',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'node', type: 'bytes32' },
          { indexed: false, name: 'owner', type: 'address' },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'node', type: 'bytes32' },
          { indexed: false, name: 'resolver', type: 'address' },
        ],
        name: 'NewResolver',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'node', type: 'bytes32' },
          { indexed: false, name: 'ttl', type: 'uint64' },
        ],
        name: 'NewTTL',
        type: 'event',
      },
    ],
    registryAddress: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
    registrarAbi: [
      {
        constant: false,
        inputs: [
          { name: 'subnode', type: 'bytes32' },
          { name: 'owner', type: 'address' },
        ],
        name: 'register',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { name: 'ensAddr', type: 'address' },
          { name: 'node', type: 'bytes32' },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
    ],
    resolverAbi: [
      {
        constant: false,
        inputs: [
          { name: 'node', type: 'bytes32' },
          { name: 'key', type: 'string' },
          { name: 'value', type: 'string' },
        ],
        name: 'setText',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          { name: 'node', type: 'bytes32' },
          { name: 'contentTypes', type: 'uint256' },
        ],
        name: 'ABI',
        outputs: [
          { name: 'contentType', type: 'uint256' },
          { name: 'data', type: 'bytes' },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'node', type: 'bytes32' },
          { name: 'x', type: 'bytes32' },
          { name: 'y', type: 'bytes32' },
        ],
        name: 'setPubkey',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ name: 'node', type: 'bytes32' }],
        name: 'content',
        outputs: [{ name: '', type: 'bytes32' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ name: 'node', type: 'bytes32' }],
        name: 'addr',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          { name: 'node', type: 'bytes32' },
          { name: 'key', type: 'string' },
        ],
        name: 'text',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'node', type: 'bytes32' },
          { name: 'contentType', type: 'uint256' },
          { name: 'data', type: 'bytes' },
        ],
        name: 'setABI',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ name: 'node', type: 'bytes32' }],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'node', type: 'bytes32' },
          { name: 'name', type: 'string' },
        ],
        name: 'setName',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'node', type: 'bytes32' },
          { name: 'hash', type: 'bytes32' },
        ],
        name: 'setContent',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ name: 'node', type: 'bytes32' }],
        name: 'pubkey',
        outputs: [
          { name: 'x', type: 'bytes32' },
          { name: 'y', type: 'bytes32' },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'node', type: 'bytes32' },
          { name: 'addr', type: 'address' },
        ],
        name: 'setAddr',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ name: 'ensAddr', type: 'address' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'node', type: 'bytes32' },
          { indexed: false, name: 'a', type: 'address' },
        ],
        name: 'AddrChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'node', type: 'bytes32' },
          { indexed: false, name: 'hash', type: 'bytes32' },
        ],
        name: 'ContentChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'node', type: 'bytes32' },
          { indexed: false, name: 'name', type: 'string' },
        ],
        name: 'NameChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'node', type: 'bytes32' },
          { indexed: true, name: 'contentType', type: 'uint256' },
        ],
        name: 'ABIChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'node', type: 'bytes32' },
          { indexed: false, name: 'x', type: 'bytes32' },
          { indexed: false, name: 'y', type: 'bytes32' },
        ],
        name: 'PubkeyChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'node', type: 'bytes32' },
          { indexed: false, name: 'indexedKey', type: 'string' },
          { indexed: false, name: 'key', type: 'string' },
        ],
        name: 'TextChanged',
        type: 'event',
      },
    ],
  })
})

/* eslint-enable */
