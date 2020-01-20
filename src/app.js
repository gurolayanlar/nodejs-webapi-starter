'use strict';

const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');
const methodOverride = require('method-override');
const config = require('./config/environment');

const app = express();

if(config.env!=='development') {
    app.set('trust proxy', 'loopback');
    app.use(morgan('tiny'));
} else {
    app.use(morgan('dev'));
}

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride());

module.exports = app;