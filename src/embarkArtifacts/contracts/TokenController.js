import EmbarkJS from '../embarkjs'
let TokenControllerJSONConfig = {
  contract_name: {
    className: 'TokenController',
    args: [],
    code: '',
    runtimeBytecode: '',
    realRuntimeBytecode: '',
    linkReferences: {},
    swarmHash: '',
    gasEstimates: null,
    functionHashes: {
      'onApprove(address,address,uint256)': 'da682aeb',
      'onTransfer(address,address,uint256)': '4a393149',
      'proxyPayment(address)': 'f48c3054',
    },
    abiDefinition: [
      {
        constant: false,
        inputs: [
          { name: '_from', type: 'address' },
          { name: '_to', type: 'address' },
          { name: '_amount', type: 'uint256' },
        ],
        name: 'onTransfer',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: '_owner', type: 'address' },
          { name: '_spender', type: 'address' },
          { name: '_amount', type: 'uint256' },
        ],
        name: 'onApprove',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'proxyPayment',
        outputs: [{ name: '', type: 'bool' }],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
      },
    ],
    filename:
      '/Users/georgispasov/Development/LimeLabs/status/discover/.embark/contracts/token/TokenController.sol',
    originalFilename: 'contracts/token/TokenController.sol',
    path:
      '/Users/georgispasov/Development/LimeLabs/status/discover/contracts/token/TokenController.sol',
    gas: 'auto',
    type: 'file',
    deploy: false,
  },
  code: '',
  runtime_bytecode: '',
  real_runtime_bytecode: '',
  swarm_hash: '',
  gas_estimates: null,
  function_hashes: {
    'onApprove(address,address,uint256)': 'da682aeb',
    'onTransfer(address,address,uint256)': '4a393149',
    'proxyPayment(address)': 'f48c3054',
  },
  abi: [
    {
      constant: false,
      inputs: [
        { name: '_from', type: 'address' },
        { name: '_to', type: 'address' },
        { name: '_amount', type: 'uint256' },
      ],
      name: 'onTransfer',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: '_owner', type: 'address' },
        { name: '_spender', type: 'address' },
        { name: '_amount', type: 'uint256' },
      ],
      name: 'onApprove',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [{ name: '_owner', type: 'address' }],
      name: 'proxyPayment',
      outputs: [{ name: '', type: 'bool' }],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
    },
  ],
}
let TokenController = new EmbarkJS.Blockchain.Contract(
  TokenControllerJSONConfig,
)
export default TokenController
