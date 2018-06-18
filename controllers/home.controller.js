const HttpError = require('../error');
const jwt = require('jsonwebtoken');
const serverConfig = require('../configs/server.config');
const logger = require('../services/logger.service');
const {validationResult} = require('express-validator/check');

module.exports.getHome = async (req, res, next) => {
    res.json('Home page');
};
