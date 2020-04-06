module.exports = {
    parseBasicAuthorization: function (authHeader) {
        if (!authHeader) {
            throw new Error('Authorization not provided');
        }

        let authString = authHeader.split(/\s/)[1];
        let stringifiedAuth = Buffer.from(authString, 'base64').toString();
        let authParts = stringifiedAuth.split(':');

        return {
            username: authParts[0],
            password: authParts[1]
        }
    }
}