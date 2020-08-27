// Torn from the garbage first repo, need to refactor

import bs58 from 'bs58';
import {
  requestApprovalApi,
  uploadMetadataApi,
  updateDappApi,
  retrieveMetadataApi,
  retrieveAllDappsMetadataApi,
} from 'api/api';

export const base64ToBlob = (base64Text: string) => {
  const byteString = atob(base64Text.split(',')[1]);

  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uintArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uintArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer]);
};

export const getBytes32FromIpfsHash = (ipfsListing: string) => {
  const decodedHash = bs58.decode(ipfsListing).slice(2).toString('hex');
  return `0x${decodedHash}`;
};

export const getIpfsHashFromBytes32 = (bytes32Hex: string) => {
  const hashHex = `1220${bytes32Hex.slice(2)}`;
  const hashBytes = Buffer.from(hashHex, 'hex');
  const hashStr = bs58.encode(hashBytes);
  return hashStr;
};

export const upload = async (metadata: any, email: string) => {
  try {
    const uploadedDataResponse = await uploadMetadataApi(metadata, email);
    return getBytes32FromIpfsHash(uploadedDataResponse.data.hash);
  } catch (error) {
    throw new Error('A DApp was not uploaded in the client');
  }
};

export const update = async (dappId: string, txHash: string) => {
  try {
    await updateDappApi(dappId, txHash);
  } catch (error) {
    throw new Error('DApp metadata was not updated in the client');
  }
};

export const requestApproval = async (metadataBytes32: string) => {
  try {
    const ipfsHash = getIpfsHashFromBytes32(metadataBytes32);
    await requestApprovalApi(ipfsHash);
  } catch (error) {
    throw new Error('No DApp was found for approval');
  }
};

export const retrieveMetadata = async (metadataBytes32: string) => {
  try {
    const convertedHash = getIpfsHashFromBytes32(metadataBytes32);
    const retrievedMetadataResponse = await retrieveMetadataApi(convertedHash);
    return retrievedMetadataResponse.data;
  } catch (error) {
    throw new Error('Searching DApp was not found in the client');
  }
};

export const retrieveAllDappsMetadata = async () => {
  const retrievedDAppsMetadataResponse = await retrieveAllDappsMetadataApi();

  const formatedDappsMetadata = {};
  const metadataHashes = Object.keys(retrievedDAppsMetadataResponse.data);
  for (let i = 0; i < metadataHashes.length; i++) {
    const convertedDappMetadataHash = getBytes32FromIpfsHash(metadataHashes[i]);

    formatedDappsMetadata[convertedDappMetadataHash] =
      retrievedDAppsMetadataResponse.data[metadataHashes[i]];
  }

  return formatedDappsMetadata;
};

export const getDappsCount = async () => {
  return Object.keys(await retrieveAllDappsMetadata()).length;
};
