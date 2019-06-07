const ipfsClient = require('ipfs-http-client');
const logger = require('./../logger/logger').getLoggerFor('IPFS-Service');

class IPFSService {

    constructor() {
        if (!IPFSService.instance) {
            this.storage = ipfsClient(process.env.IPFS_HOST, process.env.IPFS_PORT, { protocol: process.env.IPFS_PROTOCOL })
            IPFSService.instance = this;
        }

        return IPFSService.instance;
    }

    async addContent(content) {
        // Todo: pin the hash. Infura does not support it.
        const contentHash = await this.storage.add(Buffer.from(JSON.stringify(content)));

        logger.info(`Content ${content} was successfully uploaded in IPFS`);
        return contentHash[0].hash;
    }

    async generateContentHash(content) {
        const contentHash = await this.storage.add(Buffer.from(JSON.stringify(content)), { onlyHash: true });
        return contentHash[0].hash;
    }
}

module.exports = new IPFSService();
