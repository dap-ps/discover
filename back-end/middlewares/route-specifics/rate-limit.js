let rateLimit = require('express-rate-limit');
const logger = require('./../../logger/logger').getLoggerFor("Rate-Limit");

class RateLimitMiddleware {

    static setup() {
        let limiter = rateLimit({
            windowMs: process.env.RATE_LIMIT_TIME,
            max: process.env.MAX_REQUESTS_FOR_RATE_LIMIT_TIME,
            handler: function (req, res) {
                logger.warn(this.message);
                res.status(this.statusCode).send({ error: this.message });
            },
            message: `Rate limit was reached, you are able to do ${process.env.MAX_REQUESTS_FOR_RATE_LIMIT_TIME} requests per ${process.env.RATE_LIMIT_TIME} milliseconds`
        });

        return limiter;
    }
}

module.exports = RateLimitMiddleware.setup();
