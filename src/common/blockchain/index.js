/* global web3 */
import utils from './utils'
import EmbarkJS from '../../embarkArtifacts/embarkjs'

import * as IPFSService from './ipfs'
import SNTService from './services/contracts-services/snt-service/snt-service'
import DiscoverService from './services/contracts-services/discover-service/discover-service'

const initServices = function() {
  const sharedContext = {
    account: '0x0000000000000000000000000000000000000000',
  }

  sharedContext.SNTService = new SNTService(sharedContext)
  sharedContext.DiscoverService = new DiscoverService(sharedContext)

  return {
    IPFSService,
    SNTService: sharedContext.SNTService,
    DiscoverService: sharedContext.DiscoverService,
    utils,
  }
}

const getInstance = async () => {
  return new Promise((resolve, reject) => {
    const returnInstance = () => {
      try {
        const services = initServices()
        resolve(services)
      } catch (error) {
        reject(error.message)
      }
    }

    if (web3.currentProvider) {
      returnInstance()
    } else {
      EmbarkJS.onReady(err => {
        if (err) reject(err)

        returnInstance()
      })
    }
  })
}

export default { getInstance, utils }
