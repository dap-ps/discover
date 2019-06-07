import EmbarkJS from '../embarkjs'
let TokenFactoryJSONConfig = {
  contract_name: {
    className: 'TokenFactory',
    args: [],
    code: '',
    runtimeBytecode: '',
    realRuntimeBytecode: '',
    linkReferences: {},
    swarmHash: '',
    gasEstimates: null,
    functionHashes: {
      'createCloneToken(address,uint256,string,uint8,string,bool)': '5b7b72c1',
    },
    abiDefinition: [
      {
        constant: false,
        inputs: [
          { name: '_parentToken', type: 'address' },
          { name: '_snapshotBlock', type: 'uint256' },
          { name: '_tokenName', type: 'string' },
          { name: '_decimalUnits', type: 'uint8' },
          { name: '_tokenSymbol', type: 'string' },
          { name: '_transfersEnabled', type: 'bool' },
        ],
        name: 'createCloneToken',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    filename:
      '/Users/lyubo/Desktop/Projects/Status/deployment/discover/.embark/contracts/token/TokenFactory.sol',
    originalFilename: 'contracts/token/TokenFactory.sol',
    path:
      '/Users/lyubo/Desktop/Projects/Status/deployment/discover/contracts/token/TokenFactory.sol',
    gas: 'auto',
    type: 'file',
    deploy: false,
    _gasLimit: 6000000,
    error: false,
  },
  code: '',
  runtime_bytecode: '',
  real_runtime_bytecode: '',
  swarm_hash: '',
  gas_estimates: null,
  function_hashes: {
    'createCloneToken(address,uint256,string,uint8,string,bool)': '5b7b72c1',
  },
  abi: [
    {
      constant: false,
      inputs: [
        { name: '_parentToken', type: 'address' },
        { name: '_snapshotBlock', type: 'uint256' },
        { name: '_tokenName', type: 'string' },
        { name: '_decimalUnits', type: 'uint8' },
        { name: '_tokenSymbol', type: 'string' },
        { name: '_transfersEnabled', type: 'bool' },
      ],
      name: 'createCloneToken',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
}
let TokenFactory = new EmbarkJS.Blockchain.Contract(TokenFactoryJSONConfig)
export default TokenFactory
