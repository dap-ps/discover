// If you want to use IPFSClient -> extend it
import APIClient from './metadata-clients/api-client';

class MetadataClient extends APIClient {}

export default new MetadataClient();
