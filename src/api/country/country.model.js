"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountrySchema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    code: {
      type: String,
      require: true
    },
    dial: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Country", CountrySchema);
