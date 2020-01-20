'use strict';

const routes = (app) => {
    app.use('/api/v1/countries', require('./api/country'));
};

module.exports = routes;