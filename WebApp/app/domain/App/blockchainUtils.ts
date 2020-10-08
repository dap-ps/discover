import EmbarkJS from 'embarkArtifacts/embarkjs';
import Web3 from 'web3';
import { utils } from 'ethers';
import { AddressZero } from 'ethers/constants';
import { TRANSACTION_STATUS } from 'utils/constants';

// TODO refactor to awaits & types
export const broadcastContractFn = (contractMethod, account: string) => {
  return new Promise((resolve, reject) => {
    contractMethod
      .estimateGas({ from: account })
      .then((estimatedGas) => {
        contractMethod
          .send({ from: account, gas: estimatedGas + 1000 })
          .on('transactionHash', (hash) => {
            resolve(hash);
          })
          .on('error', (error) => {
            reject(error);
          });
      })
      .catch((error) => reject);
  });
};

export const ContractAddresses = {
  1: {
    SNT: process.env.MAINNET_SNT,
    DISCOVER: process.env.MAINNET_DISCOVER,
  },
  3: {
    SNT: process.env.ROPSTEN_SNT,
    DISCOVER: process.env.ROPSTEN_DISCOVER,
  },
};

export const getNetworkName = (id: number): string => {
  //  - "homestead" or 1 (or omit; this is the default network)
  //  - "ropsten"   or 3
  //  - "rinkeby"   or 4
  //  - "goerli"    or 5
  //  - "kovan"     or 42
  switch (id) {
    case 1:
      return 'mainnet';
    case 3:
      return 'ropsten';
    case 4:
      return 'rinkeby';
    case 5:
      return 'goerli';
    case 42:
      return 'kovan';
    default:
      return 'mainnet';
  }
};
// TODO tie embark to this
export interface IEmbark {
  Blockchain: any;
  Contract: any;
  Messages: any;
  Storage: any;
  Utils: any;
  enableEthereum: Function;
  isNewWeb3: Function;
  isNode: Function;
  onReady: Function;
}

export const checkNetwork = async () => {};

export const defaultMultiplier = utils.bigNumberify('1000000000000000000');

export const getNetworkId = async (): Promise<number> => {
  // TODO: memoize
  try {
    return await getWeb3().eth.net.getId();
  }catch(error) {
    return 99
  }
};

export const getRpcUrl = async (forceNetwork?: number, http?: boolean) => {
  return http ?  
    `https://${getNetworkName(
      forceNetwork ? forceNetwork : await getNetworkId(),
    )}.infura.io/v3/${process.env['INFURA_KEY']}`
  : `wss://${getNetworkName(
    forceNetwork ? forceNetwork : await getNetworkId(),
  )}.infura.io/ws/v3/${process.env['INFURA_KEY']}`
};


export const getAccount = async (): Promise<string> => {
  try {
    // @ts-ignore
    if (web3 && EmbarkJS.Blockchain.Providers.web3) {
      const account = (await EmbarkJS.enableEthereum())[0];
      return (
        // @ts-ignore
        account || (await EmbarkJS.Blockchain.Providers.web3.getAccounts())[0]
      );
    }

    return AddressZero;
  } catch (error) {
    throw new Error(
      'Could not unlock an account. Consider installing Status on your mobile or Metamask extension',
    );
  }
};

export const getWeb3 = () => {
  // @ts-ignore
  return EmbarkJS.Blockchain.Providers.web3.web3;
};

export const web3Keccak = (input: string) => {
  return getWeb3().utils.keccak256(input);
};

// TODO break out into context
let contracts = {};

// TODO investigate listeners
export const connectContract = async (Contract: any, address: string) => {
  if (!contracts[address]) {
    const clonedContract = Contract.clone();
    if (address) {
      clonedContract.address = address;
      clonedContract.options.address = address;
    }

    contracts[address] = clonedContract;
  }

  // @ts-ignore
  const provider = EmbarkJS.Blockchain.Providers.web3.getCurrentProvider();
  const network = await getNetworkId();
  if (
    !provider?.selectedAddress ||
    `${network}` != process.env['TARGET_NETWORK']
  ) {
    // @ts-ignore
    contracts[address].currentProvider = new Web3.providers.WebsocketProvider(
      await getRpcUrl(parseInt(process.env['TARGET_NETWORK'] as string)),
    );
  }

  return contracts[address];
};

export const getTxStatus = async (
  txHash: string,
): Promise<TRANSACTION_STATUS> => {
  const txReceipt = await (await getWeb3()).eth.getTransactionReceipt(txHash);
  if (txReceipt) {
    return txReceipt.status
      ? TRANSACTION_STATUS.SUCCESS
      : TRANSACTION_STATUS.FAILURE;
  } else {
    return TRANSACTION_STATUS.PENDING;
  }
};
