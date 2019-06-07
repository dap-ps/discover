let bodyParser = require('body-parser');

class BodyParserMiddleware {

    static appendTo(app) {

        app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

        // only json-type requests are valid
        app.use(bodyParser.json({
            limit: '50mb',
            extended: true,
            type: function () {
                return true;
            }
        }));
    }
}

module.exports = BodyParserMiddleware;