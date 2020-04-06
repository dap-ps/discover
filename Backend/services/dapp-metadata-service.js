const validator = require('validator')
const web3Utils = require('web3-utils')
const DAppMetadata = require('./../models/dapps-metadata-model')

const DAppImageService = require('./../services/dapp-image-service')

class DAppMetadataService {
  static async upload(req, details) {
    try {
      if (!validator.isURL(details.metadata.url, { require_protocol: true })) {
        throw new Error(`Invalid url: ${details.metadata.url}`)
      }

      if (!web3Utils.isAddress(details.metadata.uploader)) {
        throw new Error(
          `Metadata uploader [${details.metadata.uploader}] is not a valid address`,
        )
      }

      const compressedMetadata = web3Utils.keccak256(
        JSON.stringify(details.metadata),
      )
      details.metadata.image = await DAppImageService.upload(
        req,
        details.metadata.image,
      )
      const dappMetadata = await DAppMetadata.create({
        details: details.metadata,
        compressedMetadata,
        email: details.email,
      })

      return dappMetadata
    } catch (error) {
      // Code 11000 is because of uniqueness, so just return the already existing document
      if (error.code == 11000) {
        return DAppMetadata.findByPlainMetadata(details.metadata)
      }

      throw new Error(error.message)
    }
  }
}

module.exports = DAppMetadataService
