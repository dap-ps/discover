import EmbarkJS from '../embarkjs'
let SafeMathJSONConfig = {
  contract_name: {
    deploy: false,
    className: 'SafeMath',
    args: [],
    code:
      '604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea165627a7a7230582016cf9631b1c8c5757c95e1e1423cf80644fb7b828a8f112c43719668eb9121d70029',
    runtimeBytecode:
      '73000000000000000000000000000000000000000030146080604052600080fdfea165627a7a7230582016cf9631b1c8c5757c95e1e1423cf80644fb7b828a8f112c43719668eb9121d70029',
    realRuntimeBytecode:
      '73000000000000000000000000000000000000000030146080604052600080fdfea165627a7a72305820',
    linkReferences: {},
    swarmHash:
      '16cf9631b1c8c5757c95e1e1423cf80644fb7b828a8f112c43719668eb9121d7',
    gasEstimates: {
      creation: {
        codeDepositCost: '15200',
        executionCost: '116',
        totalCost: '15316',
      },
      internal: {
        'add(uint256,uint256)': 'infinite',
        'div(uint256,uint256)': 'infinite',
        'mul(uint256,uint256)': 'infinite',
        'sub(uint256,uint256)': 'infinite',
      },
    },
    functionHashes: {},
    abiDefinition: [],
    filename:
      '/Users/georgispasov/Development/LimeLabs/status/discover/.embark/contracts/utils/SafeMath.sol',
    originalFilename: 'contracts/utils/SafeMath.sol',
    path:
      '/Users/georgispasov/Development/LimeLabs/status/discover/contracts/utils/SafeMath.sol',
    gas: 'auto',
    type: 'file',
  },
  code:
    '604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea165627a7a7230582016cf9631b1c8c5757c95e1e1423cf80644fb7b828a8f112c43719668eb9121d70029',
  runtime_bytecode:
    '73000000000000000000000000000000000000000030146080604052600080fdfea165627a7a7230582016cf9631b1c8c5757c95e1e1423cf80644fb7b828a8f112c43719668eb9121d70029',
  real_runtime_bytecode:
    '73000000000000000000000000000000000000000030146080604052600080fdfea165627a7a72305820',
  swarm_hash:
    '16cf9631b1c8c5757c95e1e1423cf80644fb7b828a8f112c43719668eb9121d7',
  gas_estimates: {
    creation: {
      codeDepositCost: '15200',
      executionCost: '116',
      totalCost: '15316',
    },
    internal: {
      'add(uint256,uint256)': 'infinite',
      'div(uint256,uint256)': 'infinite',
      'mul(uint256,uint256)': 'infinite',
      'sub(uint256,uint256)': 'infinite',
    },
  },
  function_hashes: {},
  abi: [],
}
let SafeMath = new EmbarkJS.Blockchain.Contract(SafeMathJSONConfig)
export default SafeMath
