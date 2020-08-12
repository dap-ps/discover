const apiHost = process.env.API_HOST || '';
const apiSchema = process.env.API_SCHEMA || 'https';

const generateUri = (path: string) => `${apiSchema}://${apiHost}/${path}`;

const apiUrlBuilder = {
  attachmentStream: (attachmentId: string) =>
    generateUri(`attachment/${attachmentId}/stream`),
  attachmentBase64: (attachmentId: string) =>
    generateUri(`attachment/${attachmentId}/b64`),

  updateDapp: (dappId: string) => generateUri(`metadata/update/${dappId}`),
  uploadMetadata: generateUri(`upload`),
  requestApproval: (ipfsHash: string) =>
    generateUri(`metadata/approve/email/${ipfsHash}`),
  metadata: (convertedHash: string) => generateUri(`metadata/${convertedHash}`),
  metadataAll: generateUri(`metadata/all`),
};

export default apiUrlBuilder;
