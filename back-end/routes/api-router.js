const express = require('express');

const DAppsRoute = require('./dapps-routes');

class APIRouter {
    static route(app) {
        app.use('/metadata', DAppsRoute.build(express));

        /* for ElasticBeanstalk Load Balancer healthcheck */
        app.use('/healthcheck', async (req, res) => res.send('OK'))

        /* redirect if not on https on prod */
        app.use(async (req, res, next) => {
            if (req.get('x-forwarded-proto') == 'http') {
              res.redirect('https://' + req.headers.host + req.url);
            } else {
              next()
            }
        });
    }
}

module.exports = APIRouter;
