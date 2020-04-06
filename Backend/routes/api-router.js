const express = require('express');

const DAppsRoute = require('./dapps-routes');

class APIRouter {
    static route(app) {
        app.use('/metadata', DAppsRoute.build(express));

        /* for ElasticBeanstalk Load Balancer healthcheck */
        app.use('/healthcheck', async (req, res) => res.send('OK'))
    }
}

module.exports = APIRouter;
