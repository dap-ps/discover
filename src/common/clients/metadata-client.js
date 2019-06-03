import HTTPClient from './http-client'

import * as helpers from '../utils/metadata-utils'
import metadataClientEndpoints from './endpoints/metadata-client-endpoints'

class MetadataClient {
  static async upload(metadata) {
    try {
      const uploadedDataResponse = await HTTPClient.postRequest(
        metadataClientEndpoints.UPLOAD,
        metadata,
      )

      return helpers.getBytes32FromIpfsHash(uploadedDataResponse.data.hash)
    } catch (error) {
      throw new Error('A DApp was not uploaded in the client')
    }
  }

  static async update(dappId, tx) {
    try {
      await HTTPClient.postRequest(
        `${metadataClientEndpoints.UPDATE}/${dappId}`,
        { txHash: tx },
      )
    } catch (error) {
      throw new Error('DApp metadata was not updated in the client')
    }
  }

  static async requestApproval(metadataBytes32) {
    try {
      await HTTPClient.postRequest(
        `${metadataClientEndpoints.APPROVE}/${helpers.getIpfsHashFromBytes32(
          metadataBytes32,
        )}`,
      )
    } catch (error) {
      throw new Error('No DApp was found for approval')
    }
  }

  static async retrieveMetadata(metadataBytes32) {
    try {
      const convertedHash = helpers.getIpfsHashFromBytes32(metadataBytes32)
      const retrievedMetadataResponse = await HTTPClient.getRequest(
        `${metadataClientEndpoints.RETRIEVE_METADATA}/${convertedHash}`,
      )

      return retrievedMetadataResponse.data
    } catch (error) {
      throw new Error('Searching DApp was not found in the client')
    }
  }

  static async retrieveAllDappsMetadata() {
    const retrievedDAppsMetadataResponse = await HTTPClient.getRequest(
      `${metadataClientEndpoints.RETRIEVE_ALL_METADATA}`,
    )

    const formatedDappsMetadata = {}
    const metadataHashes = Object.keys(retrievedDAppsMetadataResponse.data)
    for (let i = 0; i < metadataHashes.length; i++) {
      const convertedDappMetadataHash = helpers.getBytes32FromIpfsHash(
        metadataHashes[i],
      )

      formatedDappsMetadata[convertedDappMetadataHash] =
        retrievedDAppsMetadataResponse.data[metadataHashes[i]]
    }

    return formatedDappsMetadata
  }
}

export default MetadataClient
