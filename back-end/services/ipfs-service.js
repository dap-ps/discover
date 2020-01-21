const ipfsClient = require('ipfs-http-client');
const logger = require('../logger/logger').getLoggerFor('IPFS-Service');
const config = require('../config')

class IPFSService {

    constructor() {
        if (!IPFSService.instance) {
            this.storage = ipfsClient(
                config.IPFS_HOST,
                config.IPFS_PORT,
                { protocol: config.IPFS_PROTOCOL }
            )
            IPFSService.instance = this;
        }

        return IPFSService.instance;
    }

    async addContent(content, filename='data.json') {
        let data
        if (Buffer.isBuffer(content)) {
          data = content
        } else if (typeof content == "object") {
          data = Buffer.from(JSON.stringify(content));
        } else {
          data = Buffer.from(content);
        }
        const resp = await this.storage.add(data, {pin: true});
        logger.info(`Content uploaded to IPFS: ${resp[0].hash}`);
        return resp[0].hash;
    }

    async generateContentHash(content) {
        return this.addContent(content);
    }
}

module.exports = new IPFSService();
