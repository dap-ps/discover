const DAppMetadata = require('./../models/dapps-metadata-model');

const TemplateParser = require('./../inputs/template-parser');
const DAppsMetadataInputTemplates = require('./../inputs/templates/dapps-metadata');

const IPFSService = require('./../services/ipfs-service');
const DiscoverService = require('./../services/discover-service');
const DAppImageService = require('./../services/dapp-image-service');
const DAppMetadataService = require('./../services/dapp-metadata-service');

const ApprovalEmail = require('./../emails/approval-email');
const BadRequestError = require('./../errors/bad-request-error');

const DAPP_METADATA_STATUSES = require('./../constants/dapp-metadata-statuses');

const web3 = require('./../blockchain/web3');
const logger = require('./../logger/logger').getLoggerFor('DApps-Metadata-Controller');

class DAppsMetadataController {

    static async uploadDAppMetadata(req, res) {
        try {
            const parsedMetadata = TemplateParser.parse(req.body, DAppsMetadataInputTemplates.UploadingTemplate);
            const uploadedMetadata = await DAppMetadataService.upload(req, parsedMetadata);

            logger.info(`A dapp metadata with hash [${uploadedMetadata.hash}] has been uploaded successfully`);

            res.status(200).json({ hash: uploadedMetadata.hash });
        } catch (error) {
            logger.error(error.message);
            throw new BadRequestError(error);
        }
    }

    static async sendApprovalEmail(req, res) {
        const dappMetadata = await DAppMetadata.findOne({ 'hash': req.params.hash });

        if (!dappMetadata) {
            return void res.status(404).send();
        }

        if (dappMetadata.status == DAPP_METADATA_STATUSES.NEW) {
            const approvalEmail = new ApprovalEmail(dappMetadata.details);
            approvalEmail.send();
        }

        res.status(200).send();
    }

    static async setMetadataStatus(req, res) {
        waitToBeMined(req.body.txHash, async () => {
            const dapp = await DiscoverService.retrieveDApp(req.params.dappId);
            const dappMetadata = await DAppMetadata.findByBytes32Hash(dapp.metadata);
            const initialDAppMetadata = await DAppMetadata.findOne({ 'compressedMetadata': req.params.dappId });

            if (dappMetadata && initialDAppMetadata && initialDAppMetadata.status == DAPP_METADATA_STATUSES.APPROVED) {
                dappMetadata.status = DAPP_METADATA_STATUSES.APPROVED;
                await dappMetadata.save();
            }
        });

        res.status(200).send();
    }

    static async getDAppMetadata(req, res) {
        try {
            const dappMetadata = await DAppMetadata.findOne({ 'hash': req.params.hash });

            if (dappMetadata) {
                return void res.status(200).jsonCutSensitives(dappMetadata, ['_id', '__v']);
            }

            res.status(404).send();
        } catch (error) {
            logger.error(error.message);
            res.status(404).send();
        }
    }

    static async getDAppImage(req, res) {
        try {
            const dappImage = await DAppImageService.retrieveImage(req.params.hash);

            if (dappImage) {
                const imageBuffer = Buffer.from(dappImage.content, 'base64');

                res.writeHead(200, {
                    'Content-Type': 'image/png',
                    'Content-Length': imageBuffer.length
                });
                return void res.end(imageBuffer);
            }

            res.status(404).send();
        } catch (error) {
            logger.error(error.message);
            res.status(404).send();
        }
    }

    static async getAllDappsMetadata(req, res) {
        const dappsMetadata = await DAppMetadata.find();
        const dappsFormatedMetadata = {}

        for (let i = 0; i < dappsMetadata.length; i++) {
            const metadataHash = dappsMetadata[i].hash;
            dappsFormatedMetadata[metadataHash] = dappsMetadata[i];
        }

        res.status(200).json(dappsFormatedMetadata);
    }

    static async approveDApp(req, res) {
        let dappMetadata = await DAppMetadata.findOne({ 'hash': req.params.hash });

        if (dappMetadata) {
            dappMetadata.status = DAPP_METADATA_STATUSES.APPROVED;

            const hasStaked = await DiscoverService.hasStaked(dappMetadata.compressedMetadata);
            if (hasStaked) {
                dappMetadata.ipfsHash = await IPFSService.addContent(dappMetadata.details);
            }

            await dappMetadata.save();

            logger.info(`A dapp with hash [${dappMetadata.hash}] has been approved`);
            return void res.status(200).send();
        }

        res.status(404).send();
    }

    static async rejectDApp(req, res) {
        const dappMetadata = await DAppMetadata.findOne({ 'hash': req.params.hash });

        if (dappMetadata) {
            await dappMetadata.remove();
            return void res.status(200).send();
        }

        res.status(404).send();
    }
}

const waitToBeMined = async function (txHash, callback) {
    const updateMetadataTx = await web3.eth.getTransaction(txHash);

    if (!updateMetadataTx.blockNumber) {
        setTimeout(() => {
            waitToBeMined(txHash, callback);
        }, 10000);
    }
    else {
        callback();
    }
}

module.exports = DAppsMetadataController;
