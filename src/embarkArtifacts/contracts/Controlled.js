import EmbarkJS from '../embarkjs'
let ControlledJSONConfig = {
  contract_name: {
    className: 'Controlled',
    args: [],
    code: '',
    runtimeBytecode: '',
    realRuntimeBytecode: '',
    linkReferences: {},
    swarmHash: '',
    gasEstimates: null,
    functionHashes: {
      'changeController(address)': '3cebb823',
      'controller()': 'f77c4791',
    },
    abiDefinition: [
      {
        constant: false,
        inputs: [{ name: '_newController', type: 'address' }],
        name: 'changeController',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'controller',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
    ],
    filename:
      '/Users/lyubo/Desktop/Projects/Status/deployment/discover/.embark/contracts/common/Controlled.sol',
    originalFilename: 'contracts/common/Controlled.sol',
    path:
      '/Users/lyubo/Desktop/Projects/Status/deployment/discover/contracts/common/Controlled.sol',
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
    'changeController(address)': '3cebb823',
    'controller()': 'f77c4791',
  },
  abi: [
    {
      constant: false,
      inputs: [{ name: '_newController', type: 'address' }],
      name: 'changeController',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'controller',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
  ],
}
let Controlled = new EmbarkJS.Blockchain.Contract(ControlledJSONConfig)
export default Controlled
