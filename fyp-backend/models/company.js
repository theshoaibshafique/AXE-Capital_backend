const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  title: { type: String, required: true },
  ticker: { type: String, required: true },
  domain: { type: String, required: true },
  status: { type: Boolean, required: true },
});

module.exports = Company = mongoose.model("companies", companySchema);
