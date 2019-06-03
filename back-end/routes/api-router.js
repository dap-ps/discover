const express = require('express');

const DAppsRoute = require('./dapps-routes');

class APIRouter {
    static route(app) {
        app.use('/metadata', DAppsRoute.build(express));
    }
}

module.exports = APIRouter;