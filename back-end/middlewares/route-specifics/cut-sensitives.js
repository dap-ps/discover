class ResponseCutSensitivesMiddleware {

    static cutSensitives(req, res, next) {
        res.jsonCutSensitives = function (response, sensitives) {
            if (response instanceof Array) {
                for (let i = 0; i < response.length; i++) {
                    response[i] = cutProperties(response[i], sensitives);
                }
            } else {
                response = cutProperties(response, sensitives);
            }

            res.json(response);
        }

        next();
    }
}

const cutProperties = function (objectToCut, sensitiveProps) {
    let copiedResponse = JSON.parse(JSON.stringify(objectToCut));
    for (const sensitiveProp of sensitiveProps) {
        copiedResponse[sensitiveProp] = undefined;
    }

    return copiedResponse;
}

module.exports = ResponseCutSensitivesMiddleware.cutSensitives;
