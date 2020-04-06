const TemplateValidationError = require('./template-validation-error');

class TemplatesParser {

    static parse(data, template) {
        let filteredInput = {};

        Object.keys(template).forEach((property) => {
            if (template[property].constructor.name === 'Object') {
                TemplatesParser.parse(data[property], template[property]);
            }

            // Checks if the filter is required according to template
            if (template[property] && !data[property] && data[property] != false) {
                throw new TemplateValidationError(`${property} field is required`);
            }

            if (data[property]) {
                filteredInput[property] = data[property];
            }
        });

        return filteredInput;
    }
}

module.exports = TemplatesParser;
