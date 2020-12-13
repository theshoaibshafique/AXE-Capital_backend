const mongoose = require("mongoose");

var Company = mongoose.model("Company", {
  title: { type: String },
  ticker: { type: String },
  domain: { type: String },
  status: { type: Boolean },
});

module.exports = { Company };
