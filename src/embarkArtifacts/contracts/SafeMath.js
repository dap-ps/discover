import EmbarkJS from '../embarkjs'
let SafeMathJSONConfig = {
  contract_name: {
    deploy: false,
    className: 'SafeMath',
    args: [],
    code:
      '604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea165627a7a723058201c7ba53eadf51a75ddf58183145eae723240ee0162846cb78af14e9ac08e724f0029',
    runtimeBytecode:
      '73000000000000000000000000000000000000000030146080604052600080fdfea165627a7a723058201c7ba53eadf51a75ddf58183145eae723240ee0162846cb78af14e9ac08e724f0029',
    realRuntimeBytecode:
      '73000000000000000000000000000000000000000030146080604052600080fdfea165627a7a72305820',
    linkReferences: {},
    swarmHash:
      '1c7ba53eadf51a75ddf58183145eae723240ee0162846cb78af14e9ac08e724f',
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
      '/Users/lyubo/Desktop/Projects/Status/deployment/discover/.embark/contracts/utils/SafeMath.sol',
    originalFilename: 'contracts/utils/SafeMath.sol',
    path:
      '/Users/lyubo/Desktop/Projects/Status/deployment/discover/contracts/utils/SafeMath.sol',
    gas: 'auto',
    type: 'file',
    _gasLimit: 6000000,
    error: false,
  },
  code:
    '604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea165627a7a723058201c7ba53eadf51a75ddf58183145eae723240ee0162846cb78af14e9ac08e724f0029',
  runtime_bytecode:
    '73000000000000000000000000000000000000000030146080604052600080fdfea165627a7a723058201c7ba53eadf51a75ddf58183145eae723240ee0162846cb78af14e9ac08e724f0029',
  real_runtime_bytecode:
    '73000000000000000000000000000000000000000030146080604052600080fdfea165627a7a72305820',
  swarm_hash:
    '1c7ba53eadf51a75ddf58183145eae723240ee0162846cb78af14e9ac08e724f',
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
