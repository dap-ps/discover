const apiHost = process.env.API_HOST || '';
const apiSchema = process.env.API_SCHEMA || 'https';

const generateUri = (path: string) => `${apiSchema}://${apiHost}/${path}`;

const apiUrlBuilder = {
  updateDapp: (dappId: string) => generateUri(`metadata/update/${dappId}`),
  uploadMetadata: generateUri(`metadata/`),
  requestApproval: (ipfsHash: string) =>
    generateUri(`metadata/approve/email/${ipfsHash}`),
  metadata: (convertedHash: string) => generateUri(`metadata/${convertedHash}`),
  metadataAll: generateUri(`metadata/all`),
};

export default apiUrlBuilder;
