const Web3 = require('web3');
module.exports = new Web3(new Web3.providers.WebsocketProvider(process.env.BLOCKCHAIN_CONNECTION_POINT));