let mongoose = require('mongoose');
const config = require('./');

class DBConfig {

    static config() {
        if (config.DB_CONNECTION == undefined) {
            throw Error('Unable to find MongoDB URI in DB_CONNECTION env variable!')
        }
        mongoose.Promise = global.Promise;
        mongoose.connect(config.DB_CONNECTION, { useNewUrlParser: true });
    }
}

module.exports = DBConfig;
