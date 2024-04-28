const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fundDisbursment = new Schema({
  sptbi_id: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  agency_name: {
    type: String,
    required: true,
  },
  fund_name: {
    type: String,
    required: true,
  },
  funding_type: {
    type: String,
    required: true,
  },
  sanction_dt: {
    type: Date,
    // required: true
  },
  sanctioned_amount: {
    type: Number,
    required: true,
  },
  disbursed_amount: {
    type: Number,
    required: true,
  },
  date_of_disbursement: {
    type: Date,
    required: true,
  },
  year_of_disbursement: {
    type: Number,
    required: true,
  },
  fund_cycle: {
    type: Number,
    required: true,
  },
});

// Custom validation for amount fields
fundDisbursment.path("sanctioned_amount").validate(function (value) {
  // Perform custom validation here if needed
  return !isNaN(value); // Check if it's a valid number
}, "Invalid sanctioned amount");

fundDisbursment.path("disbursed_amount").validate(function (value) {
  // Perform custom validation here if needed
  return !isNaN(value); // Check if it's a valid number
}, "Invalid disbursed amount");

module.exports = mongoose.model("fund", fundDisbursment);
