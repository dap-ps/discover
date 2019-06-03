/* global web3 */
import { broadcastContractFn } from '../helpers'
import MetadataClient from '../../../clients/metadata-client'

import BlockchainService from '../blockchain-service'

import DiscoverValidator from './discover-validator'
import DiscoverContract from '../../../../embarkArtifacts/contracts/Discover'

class DiscoverService extends BlockchainService {
  constructor(sharedContext) {
    super(sharedContext, DiscoverContract, DiscoverValidator)
  }

  // View methods
  async upVoteEffect(id, amount) {
    await this.validator.validateUpVoteEffect(id, amount)

    return DiscoverContract.methods
      .upvoteEffect(id, amount)
      .call({ from: this.sharedContext.account })
  }

  async downVoteCost(id) {
    const dapp = await this.getDAppById(id)
    return DiscoverContract.methods
      .downvoteCost(dapp.id)
      .call({ from: this.sharedContext.account })
  }

  async getDAppsCount() {
    return DiscoverContract.methods
      .getDAppsCount()
      .call({ from: this.sharedContext.account })
  }

  async getDAppByIndexWithMetadata(index) {
    try {
      const dapp = await DiscoverContract.methods
        .dapps(index)
        .call({ from: this.sharedContext.account })

      dapp.metadata = await MetadataClient.retrieveMetadata(dapp.metadata)
      return dapp
    } catch (error) {
      throw new Error(`Error fetching dapps. Details: ${error.message}`)
    }
  }

  async getDAppById(id) {
    let dapp
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

    if (dapp.id != id) {
      throw new Error('Error fetching correct data from contract')
    }

    return dapp
  }

  async getDAppDataById(id) {
    const dapp = await this.getDAppById(id)

    try {
      const dappMetadata = await MetadataClient.retrieveMetadata(dapp.metadata)
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
    const dapp = this.getDAppById(id)
    this.sharedContext.account = await super.getAccount()

    return dapp.developer == this.sharedContext.account
  }

  // Transaction methods
  async createDApp(amount, metadata) {
    await super.__unlockServiceAccount()

    const dappMetadata = JSON.parse(JSON.stringify(metadata))
    dappMetadata.uploader = this.sharedContext.account

    const dappId = web3.utils.keccak256(JSON.stringify(dappMetadata))
    await this.validator.validateDAppCreation(dappId, amount)

    const uploadedMetadata = await MetadataClient.upload(dappMetadata)

    const callData = DiscoverContract.methods
      .createDApp(dappId, amount, uploadedMetadata)
      .encodeABI()

    const createdTx = await this.sharedContext.SNTService.approveAndCall(
      this.contract,
      amount,
      callData,
    )

    await MetadataClient.requestApproval(uploadedMetadata)

    return { tx: createdTx, id: dappId }
  }

  async upVote(id, amount) {
    await this.validator.validateUpVoting(id, amount)

    const callData = DiscoverContract.methods.upvote(id, amount).encodeABI()
    return this.sharedContext.SNTService.approveAndCall(
      this.contract,
      amount,
      callData,
    )
  }

  async downVote(id) {
    const dapp = await this.getDAppById(id)
    const amount = (await this.downVoteCost(dapp.id)).c

    const callData = DiscoverContract.methods
      .downvote(dapp.id, amount)
      .encodeABI()
    return this.sharedContext.SNTService.approveAndCall(
      this.contract,
      amount,
      callData,
    )
  }

  async withdraw(id, amount) {
    await super.__unlockServiceAccount()
    await this.validator.validateWithdrawing(id, amount)

    try {
      return broadcastContractFn(
        DiscoverContract.methods.withdraw(id, amount).send,
        this.sharedContext.account,
      )
    } catch (error) {
      throw new Error(`Transfer on withdraw failed. Details: ${error.message}`)
    }
  }

  async setMetadata(id, metadata) {
    await super.__unlockServiceAccount()
    await this.validator.validateMetadataSet(id)

    const dappMetadata = JSON.parse(JSON.stringify(metadata))
    dappMetadata.uploader = this.sharedContext.account

    const uploadedMetadata = await MetadataClient.upload(dappMetadata)

    try {
      const tx = await broadcastContractFn(
        DiscoverContract.methods.setMetadata(id, uploadedMetadata).send,
        this.sharedContext.account,
      )

      await MetadataClient.update(id, tx)

      return tx
    } catch (error) {
      throw new Error(`Uploading metadata failed. Details: ${error.message}`)
    }
  }
}

export default DiscoverService
