const axios = require('axios')

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-type': 'application/json',
}

const executeRequest = async function(method, url, reqStruct) {
  return axios({
    method,
    url: `http://localhost:4000${url}`,
    data: {
      ...reqStruct.body,
    },
    headers: {
      ...DEFAULT_HEADERS,
      ...reqStruct.headers,
    },
  })
}

class HTTPClient {
  static async postRequest(url, body, headers = '') {
    return executeRequest('POST', url, { body, headers })
  }

  static async getRequest(url, headers = '') {
    return executeRequest('GET', url, { headers })
  }
}

export default HTTPClient
