'use strict';

const redis = require('redis');
const config = require('../environment');
const logger = require('../../utils/winston.helper');

const client = redis.createClient(config.redisPort || 6379);

client
  .on('ready', function () {
    logger.info('Redis server ready.');
  })
  .on('error', function (error) {
  	logger.error(error);
  })
  .on('end', function () {
  	logger.info('Redis server disconnect.');
  });

module.exports = client;
