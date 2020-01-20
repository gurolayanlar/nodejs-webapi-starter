"use strict";

const Country = require("./country.model");
const DataHelper = require("../../utils/data.helper");

// ********************* GET Routes *******************//
const index = (req, res) => {
  Country.find()
    .sort({ name: 1 })
    .exec()
    .then(DataHelper.onHandleEntityNotFound(res))
    .then(DataHelper.onResponseWithResult(res))
    .catch(DataHelper.onHandleError(res));
};
// ********************* GET Routes *******************//

// ********************* POST Routes *******************//
const create = (req, res) => {
  Country.findOne({ name: req.body.name })
    .then(faq => {
      if (!faq) {
        const record = new Country(req.body);
        Country.create(record)
          .then(DataHelper.onResponseWithResult(res, 201))
          .catch(DataHelper.onHandleError(res));
      } else {
        return res.json({
          status: "error",
          question: faq ? "The Country is already in use" : null
        });
      }
    })
    .catch(DataHelper.onHandleError(res));
};
// ********************* POST Routes *******************//

// ********************* PUT Routes *******************//
const update = (req, res) => {
  Country.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    code: req.body.code,
    dial: req.body.dial
  })
    .exec()
    .then(DataHelper.onHandleEntityNotFound(res))
    .then(DataHelper.onResponseWithResult(res))
    .catch(DataHelper.onHandleError(res));
};
// ********************* PUT Routes *******************//

// ********************* DELETE Routes *******************//
const remove = (req, res) => {
  Country.findByIdAndDelete(req.params.id)
    .exec()
    .then(DataHelper.onHandleEntityNotFound(res))
    .then(DataHelper.onResponseWithResult(res))
    .catch(DataHelper.onHandleError(res));
};
// ********************* DELETE Routes *******************//

// ********************* GET Modules *******************//
module.exports.index = index;
// ********************* GET Modules *******************//
// ********************* POST Modules *******************//
module.exports.create = create;
// ********************* POST Modules *******************//
// ********************* PUT Modules *******************//
module.exports.update = update;
// ********************* PUT Modules *******************//
// ********************* DELETE Modules *******************//
module.exports.remove = remove;
// ********************* DELETE Modules *******************//
