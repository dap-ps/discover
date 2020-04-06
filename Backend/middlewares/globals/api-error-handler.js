// This only works for express(4.x) with routes set in style ->
//      router.#method('url', middleware, action)
//      app.use('router url', router);
// #Method can be each one of the http's methods
//
// Errors Handler works for already routed app
// It's purpose is to handle routes and middleware errors

const logger = require('../../logger/logger').getLoggerFor('Global-API-error-handler');

class AppErrorsHandler {

    static handleErrorsForApp(app) {
        let appStack = app._router.stack;

        for (let i = 0; i < appStack.length; i++) {

            // Check if middleware
            if (!appStack[i].handle.stack) {
                appStack[i].handle = buildErrorHandlerForAction(appStack[i].handle);
            }

            // Check if router
            if (appStack[i].handle.stack) {
                let appRoute = appStack[i].handle.stack;
                wrapEachRouteActionWithErrorHandler(appRoute);
            }
        }

        return app;
    }
}

let wrapEachRouteActionWithErrorHandler = function (appRoute, i = 0) {

    if (i == appRoute.length) {
        return void 0;
    }

    // Check for nested routes
    if (appRoute[i].handle.stack) {
        wrapEachRouteActionWithErrorHandler(appRoute[i].handle.stack);
    } else {

        let routeActions = appRoute[i].route.stack;

        for (let j = 0; j < routeActions.length; j++) {
            let routeAction = routeActions[j].handle;
            routeActions[j].handle = buildErrorHandlerForAction(routeAction);
        }
    }

    return wrapEachRouteActionWithErrorHandler(appRoute, ++i);
}

let buildErrorHandlerForAction = function (routeAction) {
    return async function (req, res, next) {
        try {
            await routeAction(req, res, next);
        } catch (error) {
            let errorResponse = error.message ? { error: error.message } : error;

            // Checks for custom errors
            if (error.statusCode) {
                res.status(error.statusCode).send(errorResponse);
            } else {
                logger.error(JSON.stringify(errorResponse));
                res.status(500).send({ error: 'Something went wrong' });
            }
        }
    };
}

module.exports = AppErrorsHandler;
