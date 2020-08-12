import apiRequest from './apiRequest';
import apiUrlBuilder from './apiUrlBuilder';

export function updateDappApi(dappId: string, txHash: string) {
  const body = JSON.stringify({
    txHash,
  });
  return apiRequest(
    'POST',
    apiUrlBuilder.updateDapp(dappId),
    body,
    'application/json',
  );
}

export function uploadMetadataApi(metadata: any, email: string) {
  const body = JSON.stringify({ metadata, email });
  return apiRequest(
    'POST',
    apiUrlBuilder.uploadMetadata,
    body,
    'application/json',
  );
}

export function requestApprovalApi(ipfsHash: string) {
  const body = JSON.stringify({});
  return apiRequest(
    'POST',
    apiUrlBuilder.requestApproval(ipfsHash),
    body,
    'application/json',
  );
}

export function retrieveMetadataApi(convertedHash: string) {
  return apiRequest(
    'GET',
    apiUrlBuilder.metadata(convertedHash),
    undefined,
    'application/json',
    false,
  );
}

export function retrieveAllDappsMetadataApi() {
  return apiRequest(
    'GET',
    apiUrlBuilder.metadataAll,
    undefined,
    'application/json',
    false,
  );
}
