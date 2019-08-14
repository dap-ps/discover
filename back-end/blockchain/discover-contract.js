const web3 = require('./web3')
const config = require('./../config')
const DiscoverABI = require('./discover-abi.json')

module.exports = new web3.eth.Contract(DiscoverABI, config.DISCOVER_CONTRACT)
