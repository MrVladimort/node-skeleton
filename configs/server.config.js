'use strict';
const pure = require('./serverPure.config.json');
const constants = require('./serverConstants.config.json');
const logger = require('../services/logger.service');

let config = {};

if (process.env.NODE_ENV === 'testing') {
    config = pure;
    logger.info('testing')
} else if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    config = constants;
    logger.info('development or production')
}

logger.info(config);

module.exports = config;
