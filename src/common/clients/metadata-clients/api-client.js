import HTTPClient from '../http-client';

import * as helpers from '../../utils/metadata-utils';
import metadataClientEndpoints from '../endpoints/metadata-client-endpoints';

class APIClient {
  async upload(metadata) {
    const uploadedDataResponse = await HTTPClient.postRequest(
      metadataClientEndpoints.UPLOAD,
      { details: metadata }
    );

    return helpers.getBytes32FromIpfsHash(uploadedDataResponse.data.hash);
  }

  async retrieveMetadata(metadataBytes32) {
    const convertedHash = helpers.getIpfsHashFromBytes32(metadataBytes32);
    const retrievedMetadataResponse = await HTTPClient.getRequest(
      `${metadataClientEndpoints.RETRIEVE_METADATA}/${convertedHash}`
    );

    return retrievedMetadataResponse.data;
  }

  async retrieveAllDappsMetadata() {
    const retrievedDAppsMetadataResponse = await HTTPClient.getRequest(
      `${metadataClientEndpoints.RETRIEVE_ALL_METADATA}`
    );

    const formatedDappsMetadata = {};
    const metadataHashes = Object.keys(retrievedDAppsMetadataResponse.data);
    for (let i = 0; i < metadataHashes.length; i++) {
      const convertedDappMetadataHash = helpers.getBytes32FromIpfsHash(
        metadataHashes[i]
      );

      formatedDappsMetadata[convertedDappMetadataHash] =
        retrievedDAppsMetadataResponse.data[metadataHashes[i]];
    }

    return formatedDappsMetadata;
  }
}

export default APIClient;
