const DAppMetadata = require('./../models/dapps-metadata-model');

const DAppImageService = require('./../services/dapp-image-service');

const validator = require('validator');
const web3Utils = require('web3-utils');

class DAppMetadataService {

    static async upload(req, metadata) {
        try {

            if (!validator.isURL(metadata.url, { require_protocol: true })) {
                throw new Error(`Invalid url: ${metadata.url}`);
            }

            if (!web3Utils.isAddress(metadata.uploader)) {
                throw new Error(`Metadata uploader [${metadata.url}] is not a valid address`);
            }

            const compressedMetadata = web3Utils.keccak256(JSON.stringify(metadata));
            metadata.image = await DAppImageService.upload(req, metadata.image);
            const dappMetadata = await DAppMetadata.create({ details: metadata, compressedMetadata: compressedMetadata });

            return dappMetadata;
        } catch (error) {
            // Code 11000 is because of uniqueness, so just return the already existing document
            if (error.code == 11000) {
                return DAppMetadata.findByPlainMetadata(metadata);
            }

            throw new Error(error.message);
        }
    }
}

module.exports = DAppMetadataService;
