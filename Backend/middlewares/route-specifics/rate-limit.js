const rateLimit = require('express-rate-limit');
const logger = require('./../../logger/logger').getLoggerFor("Rate-Limit");
const config = require('./../../config')

class RateLimitMiddleware {

    static setup() {
        const windowMs = config.RATE_LIMIT_TIME;
        const maxReq = config.RATE_LIMIT_MAX_REQ;
        let limiter = rateLimit({
            windowMs: windowMs,
            max: maxReq,
            handler: function (req, res) {
                logger.warn(this.message);
                res.status(this.statusCode).send({ error: this.message });
            },
            message: `Rate limit was reached, you are able to do ${maxReq} requests per ${windowMs} milliseconds`
        });

        return limiter;
    }
}

module.exports = RateLimitMiddleware.setup();
