class TemplateValidationError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = TemplateValidationError;
