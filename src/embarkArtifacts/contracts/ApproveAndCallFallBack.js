import EmbarkJS from '../embarkjs'
let ApproveAndCallFallBackJSONConfig = {
  contract_name: {
    className: 'ApproveAndCallFallBack',
    args: [],
    code: '',
    runtimeBytecode: '',
    realRuntimeBytecode: '',
    linkReferences: {},
    swarmHash: '',
    gasEstimates: null,
    functionHashes: {
      'receiveApproval(address,uint256,address,bytes)': '8f4ffcb1',
    },
    abiDefinition: [
      {
        constant: false,
        inputs: [
          { name: 'from', type: 'address' },
          { name: '_amount', type: 'uint256' },
          { name: '_token', type: 'address' },
          { name: '_data', type: 'bytes' },
        ],
        name: 'receiveApproval',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    filename:
      '/Users/georgispasov/Development/LimeLabs/status/discover/.embark/contracts/token/ApproveAndCallFallBack.sol',
    originalFilename: 'contracts/token/ApproveAndCallFallBack.sol',
    path:
      '/Users/georgispasov/Development/LimeLabs/status/discover/contracts/token/ApproveAndCallFallBack.sol',
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
    'receiveApproval(address,uint256,address,bytes)': '8f4ffcb1',
  },
  abi: [
    {
      constant: false,
      inputs: [
        { name: 'from', type: 'address' },
        { name: '_amount', type: 'uint256' },
        { name: '_token', type: 'address' },
        { name: '_data', type: 'bytes' },
      ],
      name: 'receiveApproval',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
}
let ApproveAndCallFallBack = new EmbarkJS.Blockchain.Contract(
  ApproveAndCallFallBackJSONConfig,
)
export default ApproveAndCallFallBack
