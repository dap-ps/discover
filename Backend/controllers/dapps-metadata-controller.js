const DAppMetadata = require('./../models/dapps-metadata-model')

const TemplateParser = require('./../inputs/template-parser')
const DAppsMetadataInputTemplates = require('./../inputs/templates/dapps-metadata')

const IPFSService = require('./../services/ipfs-service')
const DiscoverService = require('./../services/discover-service')
const DAppImageService = require('./../services/dapp-image-service')
const DAppMetadataService = require('./../services/dapp-metadata-service')

const ApprovalEmail = require('./../emails/approval-email')
const BadRequestError = require('./../errors/bad-request-error')

const DAPP_METADATA_STATUSES = require('./../constants/dapp-metadata-statuses')

const web3 = require('./../blockchain/web3')
const logger = require('./../logger/logger').getLoggerFor(
  'DApps-Metadata-Controller',
)

class DAppsMetadataController {
  static async uploadDAppMetadata(req, res) {
    try {
      const parsedInput = TemplateParser.parse(
        req.body,
        DAppsMetadataInputTemplates.UploadingTemplate,
      )

      const uploadedMetadata = await DAppMetadataService.upload(
        req,
        parsedInput,
      )

      logger.info(
        `A dapp metadata with hash [${uploadedMetadata.hash}] has been uploaded successfully`,
      )

      res.status(200).json({ hash: uploadedMetadata.hash })
    } catch (error) {
      logger.error(error.message)
      throw new BadRequestError(error)
    }
  }

  static async sendApprovalEmail(req, res) {
    const dappMetadata = await DAppMetadata.findOne({ hash: req.params.hash })

    if (!dappMetadata) {
      return void res.status(404).send()
    }

    if (dappMetadata.status == DAPP_METADATA_STATUSES.NEW) {
      const approvalEmail = new ApprovalEmail(dappMetadata)
      approvalEmail.send()
    }

    res.status(200).send()
  }

  static async setMetadataStatus(req, res) {
    waitToBeMined(req.body.txHash, async () => {
      const dapp = await DiscoverService.retrieveDApp(req.params.dappId)
      const dappMetadata = await DAppMetadata.findByBytes32Hash(dapp.metadata)
      const initialDAppMetadata = await DAppMetadata.findOne({
        compressedMetadata: req.params.dappId,
      })

      if (
        dappMetadata &&
        initialDAppMetadata &&
        initialDAppMetadata.status != DAPP_METADATA_STATUSES.NEW
      ) {
        dappMetadata.status = DAPP_METADATA_STATUSES.APPROVED
        dappMetadata.compressedMetadata = initialDAppMetadata.compressedMetadata
        await dappMetadata.save()

        initialDAppMetadata.status = DAPP_METADATA_STATUSES.UPDATED
        await initialDAppMetadata.save()
      }
    })

    res.status(200).send()
  }

  static async getDAppMetadata(req, res) {
    try {
      const dappMetadata = await DAppMetadata.findOne({ hash: req.params.hash })

      if (dappMetadata) {
        return void res
          .status(200)
          .jsonCutSensitives(dappMetadata, ['_id', '__v'])
      }

      res.status(404).send()
    } catch (error) {
      logger.error(error.message)
      res.status(404).send()
    }
  }

  static async getDAppImage(req, res) {
    try {
      const dappImage = await DAppImageService.retrieveImage(req.params.hash)
      if (!dappImage) {
        res.status(404).send()
      }

      const imageBuffer = Buffer.from(dappImage.content, 'base64')

      /* allow for caching of images, since they are the bulk of requests */
      res.set('Cache-Control', 'public, max-age=31557600')
      res.set('Content-Type', 'image/png')
      res.set('Content-Length', imageBuffer.length)
      res.status(200)
      return void res.end(imageBuffer)
    } catch (error) {
      logger.error(error.message)
      res.status(404).send()
    }
  }

  static async getAllDappsMetadata(req, res) {
    const dappsMetadata = await DAppMetadata.find()
    const dappsFormatedMetadata = {}

    for (let i = 0; i < dappsMetadata.length; i++) {
      const metadataHash = dappsMetadata[i].hash
      dappsFormatedMetadata[metadataHash] = dappsMetadata[i]
    }

    /* don't cache for longer than 60 seconds to show new dapps quicker */
    res.set('Cache-Control', 'public, max-age=60')
    res.status(200).json(dappsFormatedMetadata)
  }

  static async approveDApp(req, res) {
    const dappMetadata = await DAppMetadata.findOne({ hash: req.params.hash })

    if (dappMetadata) {
      dappMetadata.status = DAPP_METADATA_STATUSES.APPROVED

      var json = JSON.stringify(dappMetadata.details);
      dappMetadata.ipfsHash = await IPFSService.addContent(json)

      await dappMetadata.save()

      logger.info(`A dapp with hash [${dappMetadata.hash}] has been approved`)
      return void res.status(200).send()
    }

    res.status(404).send()
  }

  static async rejectDApp(req, res) {
    const dappMetadata = await DAppMetadata.findOne({ hash: req.params.hash })

    if (dappMetadata) {
      await dappMetadata.remove()
      return void res.status(200).send()
    }

    res.status(404).send()
  }
}

const waitToBeMined = async function (txHash, callback) {
  const updateMetadataTx = await web3.eth.getTransaction(txHash)

  if (!updateMetadataTx.blockNumber) {
    setTimeout(() => {
      waitToBeMined(txHash, callback)
    }, 10000)
  } else {
    callback()
  }
}

module.exports = DAppsMetadataController
