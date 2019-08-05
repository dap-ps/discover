const ENV = process.env.REACT_APP_STAGE
const DOMAIN = ENV === 'prod' ? 'https://prod.dap.ps' : 'https://dev.dap.ps'

const metadataClientEndpoints = {
  UPLOAD: DOMAIN + '/metadata',
  UPDATE: DOMAIN + '/metadata/update',
  APPROVE: DOMAIN + '/metadata/approve/email',
  RETRIEVE_METADATA: DOMAIN + '/metadata',
  RETRIEVE_ALL_METADATA: DOMAIN + '/metadata/all',
}

export default metadataClientEndpoints
