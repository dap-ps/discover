let mongoose = require("mongoose");

class DBConfig {

    static config() {
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });
    }
}

module.exports = DBConfig;
