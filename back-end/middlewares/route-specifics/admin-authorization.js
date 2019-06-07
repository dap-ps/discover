const logger = require('./../../logger/logger').getLoggerFor('Admin-authorization');
const parseBasicAuthorization = require('./../../utils/authorization-utils').parseBasicAuthorization;

class AdminAuthorizationMiddleware {

    static authorize(req, res, next) {
        try {
            let authorization = parseBasicAuthorization(req.headers.authorization);
            if (authorization.username == process.env.ADMIN_USER && authorization.password == process.env.ADMIN_PASSWORD) {
                return void next();
            }

            throw new Error('Wrong admin credentials');
        } catch (error) {
            logger.error(error.message);
            res.status(401).send();
        }
    }
}

module.exports = AdminAuthorizationMiddleware.authorize;
