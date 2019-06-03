const DiscoverContract = require('../blockchain/discover-contract');

const logger = require('./../logger/logger').getLoggerFor('Discover-Service');

const ACCOUNT = '0x0000000000000000000000000000000000000000';

class DiscoverService {

    static async retrieveDApp(id) {
        try {
            const dappIndex = await DiscoverContract.methods
                .id2index(id)
                .call({ from: ACCOUNT });

            const dapp = await DiscoverContract.methods
                .dapps(dappIndex)
                .call({ from: ACCOUNT });

            if (dapp.id != id) {
                throw new Error('Error fetching correct data from contract')
            }

            return dapp;
        } catch (error) {
            logger.error(error.message);
            throw new Error(`A dapp with id [${id}] is not found in the contract`);
        }

    }

    static async hasStaked(dappId) {
        const dapp = await DiscoverService.retrieveDApp(dappId);
        return dapp.effectiveBalance > 0;
    }

}

module.exports = DiscoverService;
