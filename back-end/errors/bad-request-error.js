const INTERNAL_ERRORS = {
    'Error': 'Error',
    'MongoError': 'MongoError',
    'MongooseError': 'MongooseError'
}

class BadRequestError extends Error {
    constructor(error) {
        if (INTERNAL_ERRORS[error.constructor.name]) {
            super('Bad request');
        } else {
            // This is supposed to be a custom error
            super(error.message);
        }

        this.statusCode = 400;
    }
}

module.exports = BadRequestError;
