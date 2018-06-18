const serverConfig = require('./configs/server.config');
const accessConfig = require('./configs/access.config');
const express = require('express');
const HttpError = require('./error');

const bodyParser = require('body-parser');
const _ = require('lodash');
const logger = require('./services/logger.service');

logger.info(`Process: ${process.cwd()}`);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(require('morgan')('combined', {stream: logger.stream}));

require('./routes')(app);

async function notFound(req, res, next) {
    next(new HttpError(404, 'Page not found'));
}

async function errorHandler(err, req, res, next) {
    let errorMsg = `[${new Date().toString()}] "${req.method} ${req.originalUrl}": ${err.message}`;
    if (req.query && _.keys(req.query).length > 0) {
        errorMsg += ` | query: ${JSON.stringify(req.query)}`;
    }
    if (req.body && _.keys(req.body).length > 0) {
        errorMsg += ` | body: ${JSON.stringify(req.body)}`;
    }
    logger.error(errorMsg);
    res.status(err.status || 500)
        .json({error: err.message || err});
}

app.use(notFound);
app.use(errorHandler);

const initApp = async () => {
    try {
        await app.listen(serverConfig.port);
        logger.info("Server running on " + serverConfig.port)
    } catch (err) {
        logger.error(err);
    }
};
initApp();


module.exports = app;
