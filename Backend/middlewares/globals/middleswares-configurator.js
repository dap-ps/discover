const HelmetMiddleware = require('./helmet');
const CORSOriginsMiddleware = require('./cors');
const BodyParserMiddleware = require('./body-parser');

class MiddlewaresConfigurator {

    static config(app) {
        HelmetMiddleware.appendTo(app);
        BodyParserMiddleware.appendTo(app);
        CORSOriginsMiddleware.appendTo(app);
    }
}

module.exports = MiddlewaresConfigurator;
