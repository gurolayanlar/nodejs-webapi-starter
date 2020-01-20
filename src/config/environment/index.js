const path = require("path");
const lodash = require("lodash");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const config = {
  env: process.env.NODE_ENV,
  root: path.normalize(`${__dirname}/../../..`),
  port: process.env.PORT || 9000,
  ip: process.env.IP || "127.0.0.1",
  secret: "secret-code",
  redisPort: 6379,
  mongo: {
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  }
};

module.exports = lodash.merge(
  config,
  require(`./${process.env.NODE_ENV}.js`) || {}
);
