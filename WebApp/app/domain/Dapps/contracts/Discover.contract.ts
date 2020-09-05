import { bigNumberify, BigNumber } from 'ethers/utils';
import {
  connectContract,
  getAccount,
  defaultMultiplier,
  broadcastContractFn,
  ContractAddresses,
  getNetworkId,
} from 'domain/App/blockchainContext';
import DiscoverAbi from '../../../embarkArtifacts/contracts/Discover';
import { AddressZero } from 'ethers/constants';
import { SNTapproveAndCall } from './SNT.contract';
import { uploadMetadataApi, updateDappApi, retrieveMetadataApi } from 'api/api';
import { IDapp } from '../types';
import { getIpfsHashFromBytes32 } from 'domain/App/sagas/metadata.saga';
import { DAPP_STATUS } from 'utils/constants';

// View methods
export const DiscoverUpVoteEffect = async (id: string, amount: number) => {
  const tokenAmount = bigNumberify(amount);
  const DiscoverContract = await connectContract(
    DiscoverAbi,
    ContractAddresses[await getNetworkId()].DISCOVER,
  );
  await validateUpVoteEffect(id, amount);

  return await DiscoverContract.methods
    .upvoteEffect(id, tokenAmount.toString())
    .call({ from: AddressZero });
};

export const DiscoverDownVoteCost = async (id: string) => {
  const dapp = await DiscoverGetDAppById(id);

  const DiscoverContract = await connectContract(
    DiscoverAbi,
    ContractAddresses[await getNetworkId()].DISCOVER,
  );
  return await DiscoverContract.methods
    .downvoteCost(dapp.id)
    .call({ from: AddressZero });
};

export const DiscoverGetDAppById = async (id: string) => {
  const DiscoverContract = await connectContract(
    DiscoverAbi,
    ContractAddresses[await getNetworkId()].DISCOVER,
  );
  const dappExists = await DiscoverDappExists(id);

  if (dappExists) {
    try {
      const dappId = await DiscoverContract.methods
        .id2index(id)
        .call({ from: AddressZero });

      const dapp = await DiscoverContract.methods
        .dapps(dappId)
        .call({ from: AddressZero });
      if (dapp.id !== id) {
        throw new Error('Error fetching correct data from contract');
      }
      return dapp;
    } catch (error) {
      throw new Error('Searching DApp does not exists');
    }
  } else {
    throw 'dapp not found';
  }
};

export const DiscoverGetDAppsCount = async () => {
  const DiscoverContract = await connectContract(
    DiscoverAbi,
    ContractAddresses[await getNetworkId()].DISCOVER,
  );
  return parseInt(
    await DiscoverContract.methods.getDAppsCount().call({ from: AddressZero }),
  );
};

export const DiscoverGetDAppsMeta = async (id: number) => {
  const DiscoverContract = await connectContract(
    DiscoverAbi,
    ContractAddresses[await getNetworkId()].DISCOVER,
  );
  return await DiscoverContract.methods.dapps(id).call({ from: AddressZero });
};

export const DiscoverHelperGetMeta = async (
  dapp: Partial<IDapp>,
): Promise<IDapp> => {
  try {
    const {
      hash,
      ipfsHash,
      status,
      details: { category, dateAdded, description, image, name, uploader, url },
    }: {
      compressedMetadata: string;
      details: {
        category: string;
        dateAdded: 1599137970891;
        description: string;
        image: string;
        name: string;
        uploader: string;
        url: string;
      };
      email: string;
      hash: string;
      ipfsHash: string;
      status: DAPP_STATUS;
    } = (
      await retrieveMetadataApi(
        getIpfsHashFromBytes32(dapp.compressedMetadata as string),
      )
    ).data;
    return {
      ...(dapp as IDapp),
      hash: hash,
      ipfsHash: ipfsHash,
      status: status,
      category: category,
      dateAdded: dateAdded,
      desc: description,
      icon: image,
      image: image,
      name: name,
      uploader: uploader,
      url: url,
    };
  } catch (error) {
    console.error(
      `404: Cached metadata not found for ${getIpfsHashFromBytes32(
        dapp.compressedMetadata as string,
      )} `,
    );
    return dapp as IDapp;
  }
};

export const DiscoverSafeMax = async () => {
  const DiscoverContract = await connectContract(
    DiscoverAbi,
    ContractAddresses[await getNetworkId()].DISCOVER,
  );
  return DiscoverContract.methods.safeMax().call({ from: AddressZero });
};

export const DiscoverDappExists = async (id: string) => {
  const DiscoverContract = await connectContract(
    DiscoverAbi,
    ContractAddresses[await getNetworkId()].DISCOVER,
  );
  return DiscoverContract.methods.existingIDs(id).call({ from: AddressZero });
};

// Transaction methods
export const DiscoverCreateDApp = async (
  dappId: string,
  tokenAmount: BigNumber,
  uploadedMetadata: any,
) => {
  const account: string = await getAccount();
  if (account == AddressZero) {
    throw 'Account not connected';
  }
  const DiscoverContract = await connectContract(
    DiscoverAbi,
    ContractAddresses[await getNetworkId()].DISCOVER,
  );
  const callData = DiscoverContract.methods
    .createDApp(dappId, tokenAmount.toString(), uploadedMetadata)
    .encodeABI();

  return await SNTapproveAndCall(
    DiscoverContract.options.address,
    tokenAmount,
    callData,
  );
};

export const DiscoverUpVote = async (id: string, amount: number) => {
  const DiscoverContract = await connectContract(
    DiscoverAbi,
    ContractAddresses[await getNetworkId()].DISCOVER,
  );
  const tokenAmount = defaultMultiplier.mul(bigNumberify(amount));
  await validateUpVoting(id, tokenAmount.toNumber());

  const callData = DiscoverContract.methods
    .upvote(id, tokenAmount.toString())
    .encodeABI();
  return await SNTapproveAndCall(
    DiscoverContract.options.address,
    tokenAmount,
    callData,
  );
};

export const DiscoverDownVote = async (id: string) => {
  const DiscoverContract = await connectContract(
    DiscoverAbi,
    ContractAddresses[await getNetworkId()].DISCOVER,
  );
  const dapp = await DiscoverGetDAppById(id);
  const amount = (await DiscoverDownVoteCost(dapp.id)).c;

  const tokenAmount = defaultMultiplier.mul(bigNumberify(amount));

  const callData = DiscoverContract.methods
    .downvote(dapp.id, tokenAmount.toString())
    .encodeABI();
  return SNTapproveAndCall(
    DiscoverContract.options.address,
    tokenAmount,
    callData,
  );
};

export const DiscoverWithdraw = async (id: string, amount: number) => {
  const account: string = await getAccount();
  if (account == AddressZero) {
    throw 'Account not connected';
  }
  const DiscoverContract = await connectContract(
    DiscoverAbi,
    ContractAddresses[await getNetworkId()].DISCOVER,
  );
  const tokenAmount = defaultMultiplier.mul(bigNumberify(amount));
  await validateWithdrawing(id, tokenAmount);

  try {
    return broadcastContractFn(
      DiscoverContract.methods.withdraw(id, tokenAmount.toString()),
      account,
    );
  } catch (error) {
    throw new Error(`Transfer on withdraw failed. Details: ${error.message}`);
  }
};

export const DiscoverSetMetadata = async (
  id: string,
  metadata: any,
  email: string,
) => {
  const account: string = await getAccount();
  if (account == AddressZero) {
    throw 'Account not connected';
  }
  const DiscoverContract = await connectContract(
    DiscoverAbi,
    ContractAddresses[await getNetworkId()].DISCOVER,
  );
  await validateMetadataSet(id);

  const dappMetadata = JSON.parse(JSON.stringify(metadata));
  dappMetadata.uploader = account;

  const uploadedMetadata = await uploadMetadataApi(dappMetadata, email);

  try {
    const tx = await broadcastContractFn(
      DiscoverContract.methods.setMetadata(id, uploadedMetadata),
      account,
    );

    // TODO: This results in endless "Waiting for confirmation... errors, though the tx is successful"
    await updateDappApi(id, tx as string);

    return tx;
  } catch (error) {
    throw new Error(`Uploading metadata failed. Details: ${error.message}`);
  }
};

export const DiscoverWithdrawMax = async (dappId: string) => {
  const account: string = await getAccount();
  if (account == AddressZero) {
    throw 'Account not connected';
  }
  const DiscoverContract = await connectContract(
    DiscoverAbi,
    ContractAddresses[await getNetworkId()].DISCOVER,
  );
  const decimals = 1000000;
  const draw = await DiscoverContract.methods.withdrawMax(dappId).call({
    from: account,
  });
  const withdraw = parseInt(draw, 10);
  return Math.floor(withdraw / decimals);
};

export const validateUpVoteEffect = async (id: string, amount: number) => {
  const dapp = await DiscoverGetDAppById(id);

  const safeMax = await DiscoverSafeMax();
  // Potential overflow issue from existing code
  if (
    Number(dapp.balance) +
      bigNumberify(amount).div(defaultMultiplier).toNumber() >
    safeMax
  ) {
    throw new Error(
      `You cannot upvote by this much, try with a lower amount. Maximum upvote amount: 
      ${Number(safeMax) - Number(dapp.balance)}`,
    );
  }
};

export const validateDAppCreation = async (id: string, amount: BigNumber) => {
  const dappExists = await DiscoverDappExists(id);
  if (dappExists) {
    throw new Error('You must submit a unique ID');
  }

  const safeMax = await DiscoverSafeMax();
  if (amount.div(defaultMultiplier).toNumber() > safeMax) {
    throw new Error('You cannot stake more SNT than the ceiling dictates');
  }
};

export const validateUpVoting = async (id: string, amount: number) => {
  await validateUpVoteEffect(id, amount);

  if (amount <= 0) {
    throw new Error('You must send some SNT in order to upvote');
  }
};

export const validateWithdrawing = async (id: string, amount: BigNumber) => {
  const account: string = await getAccount();
  if (account == AddressZero) {
    throw 'Account not connected';
  }
  const dapp = await DiscoverGetDAppById(id);

  if (dapp.developer.toLowerCase() !== account) {
    throw new Error('Only the developer can withdraw SNT staked on this data');
  }
  if (dapp.available.lt(amount)) {
    throw new Error(
      'You can only withdraw a percentage of the SNT staked, less what you have already received',
    );
  }
};

export const validateMetadataSet = async (id: string) => {
  const account: string = await getAccount();
  if (account == AddressZero) {
    throw 'Account not connected';
  }
  const dapp = await DiscoverGetDAppById(id);

  if (dapp.developer.toLowerCase() !== account) {
    throw new Error('Only the developer can update the metadata');
  }
};
