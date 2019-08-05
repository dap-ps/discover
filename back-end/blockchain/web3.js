const Web3 = require('web3');
const config = require('../config')

module.exports = new Web3(
    new Web3.providers.WebsocketProvider(config.BLOCKCHAIN_CONNECTION_POINT)
);
