const cors = require('cors');

class CORSOriginMiddleware {

    static appendTo(app) {
        app.use(cors());
    }
}
module.exports = CORSOriginMiddleware;
