const path = require('path')
const config = require('./config')

function setupSystem() {
    let dotenv = require("dotenv");
    dotenv.config();

    let DBConfig = require('./config/db-config');
    DBConfig.config();
}

async function setupAPI() {
    let express = require("express");
    let app = express();

    /* accept headers like x-forwarded-proto from proxies */
    app.set('trust proxy', 'loopback')

    setupPreRoutedAppMiddlewares(app);

    let APIRouter = require('./routes/api-router');
    APIRouter.route(app);

    setupPostRoutedAppMiddlewares(app);

    app.use(express.static(
      path.join(__dirname, '/frontend'),
      { maxAge: '30 days' }
    ));

    /* Handles any requests that don't match the ones above */
    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname, 'frontend/index.html'));
    });

    app.listen(config.PORT);
    console.log(`Server started on port: ${config.PORT}`);

    return app;
}

let setupPreRoutedAppMiddlewares = function (app) {
    require('./middlewares/globals/middleswares-configurator').config(app);
}

let setupPostRoutedAppMiddlewares = function (app) {
    require('./middlewares/globals/api-error-handler').handleErrorsForApp(app);
}

setupSystem();
module.exports = setupAPI();
