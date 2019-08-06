const logger = require('../../logger/logger').getLoggerFor('Admin-authorization');
const parseBasicAuthorization = require('../../utils/authorization-utils').parseBasicAuthorization;
const config = require('../../config')

class AdminAuthorizationMiddleware {
    static verifyUserAuth(auth) {
        return (
            auth.username == config.ADMIN_USER &&
            auth.password == config.ADMIN_PASSWORD
        )
    }

    static authorize(req, res, next) {
        try {
            let authorization = parseBasicAuthorization(req.headers.authorization);
            if (AdminAuthorizationMiddleware.verifyUserAuth(authorization)) {
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
