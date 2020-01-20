"use strict";

const lodash = require("lodash");
const logger = require("./winston.helper");

const onHandleError = (res, statusCode) => {
  statusCode = statusCode || 200;
  return function(error) {
    logger.error(error);
    return res.status(statusCode).json({
      status: "error",
      message: error._message || "An error occured at server!",
      data: error.errors
    });
  };
};

const onValidationError = (res, statusCode) => {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err.errors);
  };
};

const onResponseWithResult = (res, statusCode) => {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity.toObject());
    }
  };
};

const onHandleEntityNotFound = (res, statusCode) => {
  statusCode = statusCode || 204;
  return function(entity) {
    if (!entity) {
      res.status(statusCode).end();
      return null;
    }
    return entity;
  };
};

const onSaveUpdates = updates => {
  return entity => {
    var updated = lodash.mergeWith(entity, updates, function(a, b) {
      if (lodash.isArray(a)) {
        return b;
      }
    });
    return updated.saveAsync().then(function(updated) {
      return updated;
    });
  };
};

const onRemoveEntity = (res, statusCode) => {
  statusCode = statusCode || 204;
  return function(entity) {
    if (entity) {
      return entity.removeAsync().then(function() {
        return res.status(204).end();
      });
    }
  };
};

module.exports.onHandleError = onHandleError;
module.exports.onValidationError = onValidationError;
module.exports.onResponseWithResult = onResponseWithResult;
module.exports.onHandleEntityNotFound = onHandleEntityNotFound;
module.exports.onSaveUpdates = onSaveUpdates;
module.exports.onRemoveEntity = onRemoveEntity;
