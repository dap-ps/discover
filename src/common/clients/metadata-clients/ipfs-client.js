import * as helpers from '../../utils/metadata-utils';
import EmbarkJS from '../../../embarkArtifacts/embarkjs';

const checkIPFSAvailability = async () => {
  const isAvailable = await EmbarkJS.Storage.isAvailable();
  if (!isAvailable) {
    throw new Error('IPFS Storage is unavailable');
  }
};

const uploadImage = async base64Image => {
  const imageFile = [
    {
      files: [helpers.base64ToBlob(base64Image)]
    }
  ];

  return EmbarkJS.Storage.uploadFile(imageFile);
};

const uploadMetadata = async metadata => {
  const hash = await EmbarkJS.Storage.saveText(metadata);
  return helpers.getBytes32FromIpfsHash(hash);
};

const retrieveMetadata = async metadataBytes32 => {
  const metadataHash = helpers.getIpfsHashFromBytes32(metadataBytes32);
  return EmbarkJS.Storage.get(metadataHash);
};

const retrieveImageUrl = async imageHash => {
  return EmbarkJS.Storage.getUrl(imageHash);
};

class IPFSClient {
  async upload(metadata) {
    try {
      await checkIPFSAvailability();

      metadata.image = await uploadImage(metadata.image);
      const uploadedMetadataHash = await uploadMetadata(
        JSON.stringify(metadata)
      );

      return uploadedMetadataHash;
    } catch (error) {
      throw new Error(
        `Uploading DApp metadata to IPFS failed. Details: ${error.message}`
      );
    }
  }

  async retrieveMetadata(metadataBytes32) {
    try {
      await checkIPFSAvailability();

      const metadata = JSON.parse(await retrieveMetadata(metadataBytes32));
      metadata.image = await retrieveImageUrl(metadata.image);

      return metadata;
    } catch (error) {
      throw new Error(
        `Fetching metadata from IPFS failed. Details: ${error.message}`
      );
    }
  }
}

export default IPFSClient;
