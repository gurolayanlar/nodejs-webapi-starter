'use strict';

const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/environment');

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ${err}');
    process.exit(-1);
});

// Create server
const server = http.createServer(app);

// Populate databases with initial data
if (config.seedDb) {
  require('./config/settings/seedDb');
}

// Connect to redis server
require('./config/settings/redis');

// Load application api
require('./routes')(app);

const startServer = () => {
  server.listen(config.port, config.ip, function() {
    console.log(
      "Mock server listening on %d, in %s mode",
      config.port,
      app.get("env")
    );
  });
};

setImmediate(startServer);
