module.exports = (app) => {
    app.use('/api', require('./home.route'));
};
