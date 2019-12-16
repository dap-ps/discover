/* global web3 */
import { broadcastContractFn } from '../helpers'
import MetadataClient from '../../../clients/metadata-client'

import BlockchainService from '../blockchain-service'

import DiscoverValidator from './discover-validator'
import DiscoverContract from '../../../../embarkArtifacts/contracts/Discover'

const BN = require('bn.js')

const EMPTY_METADATA = {
  developer: '',
  id: '',
  metadata: {
    status: 'EMPTY',
  },
  balance: 0,
  rate: 0,
  available: 0,
  votesMinted: 0,
  votesCast: 0,
  effectiveBalance: 0,
}

class DiscoverService extends BlockchainService {
  constructor(sharedContext) {
    super(sharedContext, DiscoverContract, DiscoverValidator)
    this.decimalMultiplier = new BN('1000000000000000000', 10)
  }

  // View methods
  async upVoteEffect(id, amount) {
    const tokenAmount = new BN(amount, 10)
    await this.validator.validateUpVoteEffect(id, tokenAmount)

    return DiscoverContract.methods
      .upvoteEffect(id, tokenAmount.toString())
      .call({ from: this.sharedContext.account })
  }

  async downVoteCost(id) {
    const dapp = await this.getDAppById(id)
    return DiscoverContract.methods
      .downvoteCost(dapp.id)
      .call({ from: this.sharedContext.account })
  }

  async getDAppsCount() {
    return MetadataClient.getDappsCount()
  }

  async pushDapps(dappsCache, dapps) {
    Object.keys(dappsCache).forEach(metadataHash => {
      const dappMetadata = dappsCache[metadataHash]

      if (dappMetadata.status == 'APPROVED') {
        dapps.push({
          developer: '',
          id: dappMetadata.compressedMetadata,
          metadata: {
            ...dappMetadata.details,
            status: dappMetadata.status,
          },
          balance: 0,
          rate: 0,
          available: 0,
          votesMinted: 0,
          votesCast: 0,
          effectiveBalance: 0,
        })
      }
    })
  }

  async getAllDappsWithoutMetadata() {
    try {
      const contractDappsCount = await DiscoverContract.methods
        .getDAppsCount()
        .call({ from: this.sharedContext.account })

      const dappsCache = JSON.parse(
        JSON.stringify(await MetadataClient.retrieveMetadataCache()),
      )

      let dapps = [];

      await this.pushDapps(dappsCache, dapps)

      return dapps
    } catch (error) {
      throw new Error(`Error fetching dapps. Details: ${error.message}`)
    }
  }

  async getAllDappsWithMetadata() {
    try {
      const contractDappsCount = await DiscoverContract.methods
        .getDAppsCount()
        .call({ from: this.sharedContext.account })

      const dappsCache = JSON.parse(
        JSON.stringify(await MetadataClient.retrieveMetadataCache()),
      )

      let asyncCalls = [ ]
      for (let i = 0; i < contractDappsCount; i++) {
        asyncCalls.push(
          DiscoverContract.methods.dapps(i).call({from: this.sharedContext.account})
        )
      }
      let dapps = [];
      /* using Promise.all() to run calls in parallel */
      let dappsCalls = await Promise.all(asyncCalls)

      for (let dapp of dappsCalls) {
        const dappMetadata = dappsCache[dapp.metadata]
        if (dappMetadata) {
          delete dappsCache[dapp.metadata]
          dapp.metadata = dappMetadata.details
          dapp.metadata.status = dappMetadata.status

          dapps.push(dapp)
        }
      }

      await this.pushDapps(dappsCache, dapps)

      return dapps
    } catch (error) {
      throw new Error(`Error fetching dapps. Details: ${error.message}`)
    }
  }

  async getDAppByIndexWithMetadata(index) {
    try {
      const dapp = await DiscoverContract.methods
        .dapps(index)
        .call({ from: this.sharedContext.account })

      const dappMetadata = await MetadataClient.retrieveDAppFromCache(
        dapp.metadata,
      )

      if (dappMetadata === null) return null
      dapp.metadata = dappMetadata.details
      dapp.metadata.status = dappMetadata.status
      return dapp
    } catch (error) {
      throw new Error(`Error fetching dapps. Details: ${error.message}`)
    }
  }

  async getDAppById(id) {
    let dapp = EMPTY_METADATA
    const dappExists = await this.isDAppExists(id)

    if (dappExists) {
      try {
        const dappId = await DiscoverContract.methods
          .id2index(id)
          .call({ from: this.sharedContext.account })

        dapp = await DiscoverContract.methods
          .dapps(dappId)
          .call({ from: this.sharedContext.account })
      } catch (error) {
        throw new Error('Searching DApp does not exists')
      }

      if (dapp.id !== id) {
        throw new Error('Error fetching correct data from contract')
      }
    }

    return dapp
  }

  async getDAppDataById(id) {
    const dapp = await this.getDAppById(id)
    if (dapp.metadata.status === 'EMPTY') return EMPTY_METADATA

    try {
      const dappMetadata = await MetadataClient.retrieveMetadata(dapp.metadata)
      if (dappMetadata === null) return EMPTY_METADATA
      dapp.metadata = dappMetadata.details
      dapp.metadata.status = dappMetadata.status

      return dapp
    } catch (error) {
      throw new Error('Error fetching correct data')
    }
  }

  async safeMax() {
    return DiscoverContract.methods
      .safeMax()
      .call({ from: this.sharedContext.account })
  }

  async isDAppExists(id) {
    return DiscoverContract.methods
      .existingIDs(id)
      .call({ from: this.sharedContext.account })
  }

  async checkIfCreatorOfDApp(id) {
    const dapp = await this.getDAppById(id)
    if (dapp.metadata.status === 'EMPTY') return false
    this.sharedContext.account = await super.getAccount()

    return dapp.developer.toLowerCase() === this.sharedContext.account
  }

  // Transaction methods
  async createDApp(amount, metadata, email) {
    const tokenAmount = this.decimalMultiplier.mul(new BN(amount, 10))

    const ConnectedDiscoverContract = await super.__unlockServiceAccount(
      DiscoverContract,
    )

    const dappMetadata = JSON.parse(JSON.stringify(metadata))
    dappMetadata.uploader = this.sharedContext.account

    const dappId = web3.utils.keccak256(JSON.stringify(dappMetadata))
    await this.validator.validateDAppCreation(dappId, tokenAmount)

    const uploadedMetadata = await MetadataClient.upload(dappMetadata, email)

    // eslint-disable-next-line no-undef-init
    let createdTx = undefined

    if (tokenAmount.gt(new BN(0, 10))) {
      const callData = ConnectedDiscoverContract.methods
        .createDApp(dappId, tokenAmount.toString(), uploadedMetadata)
        .encodeABI()

      createdTx = await this.sharedContext.SNTService.approveAndCall(
        this.contract,
        tokenAmount,
        callData,
      )
    }

    await MetadataClient.requestApproval(uploadedMetadata)

    return { tx: createdTx, id: dappId }
  }

  async upVote(id, amount) {
    const tokenAmount = this.decimalMultiplier.mul(new BN(amount, 10))

    await this.validator.validateUpVoting(id, tokenAmount)

    const callData = DiscoverContract.methods
      .upvote(id, tokenAmount.toString())
      .encodeABI()
    return this.sharedContext.SNTService.approveAndCall(
      this.contract,
      tokenAmount,
      callData,
    )
  }

  async downVote(id) {
    const dapp = await this.getDAppById(id)
    const amount = (await this.downVoteCost(dapp.id)).c

    const amountBN = new BN(amount, 10)

    const tokenAmount = this.decimalMultiplier.mul(amountBN)

    const callData = DiscoverContract.methods
      .downvote(dapp.id, tokenAmount.toString())
      .encodeABI()
    return this.sharedContext.SNTService.approveAndCall(
      this.contract,
      tokenAmount,
      callData,
    )
  }

  async withdraw(id, amount) {
    const tokenAmount = this.decimalMultiplier.mul(new BN(amount, 10))
    const ConnectedDiscoverContract = await super.__unlockServiceAccount(
      DiscoverContract,
    )
    await this.validator.validateWithdrawing(id, tokenAmount)

    try {
      return broadcastContractFn(
        ConnectedDiscoverContract.methods.withdraw(id, tokenAmount.toString()),
        this.sharedContext.account,
      )
    } catch (error) {
      throw new Error(`Transfer on withdraw failed. Details: ${error.message}`)
    }
  }

  async setMetadata(id, metadata, email) {
    const ConnectedDiscoverContract = await super.__unlockServiceAccount(
      DiscoverContract,
    )
    await this.validator.validateMetadataSet(id)

    const dappMetadata = JSON.parse(JSON.stringify(metadata))
    dappMetadata.uploader = this.sharedContext.account

    const uploadedMetadata = await MetadataClient.upload(dappMetadata, email)

    try {
      const tx = await broadcastContractFn(
        ConnectedDiscoverContract.methods.setMetadata(id, uploadedMetadata),
        this.sharedContext.account,
      )

      // TODO: This results in endless "Waiting for confirmation... errors, though the tx is successful"
      await MetadataClient.update(id, tx)

      return tx
    } catch (error) {
      throw new Error(`Uploading metadata failed. Details: ${error.message}`)
    }
  }

  async withdrawMax(dappId) {
    const decimals = 1000000
    const draw = await DiscoverContract.methods.withdrawMax(dappId).call({
      from: this.sharedContext.account,
    })
    const withdraw = parseInt(draw, 10)
    return Math.floor(withdraw / decimals)
  }
}

export default DiscoverService
