function setupSystem() {
    let dotenv = require("dotenv");
    dotenv.config();

    let DBConfig = require('./config/db-config');
    DBConfig.config();
}

async function setupAPI() {
    let express = require("express");
    let app = express();

    setupPreRoutedAppMiddlewares(app);

    let APIRouter = require('./routes/api-router');
    APIRouter.route(app);

    setupPostRoutedAppMiddlewares(app);

    app.listen(process.env.PORT);
    console.log(`Server started on port: ${process.env.PORT}...`);

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
