const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fundDisbursment = new Schema({
    sptbi_id: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    agency_name: {
        type: String,
        required: true
    },
    fund_name: {
        type: String,
        required: true
    },
    funding_type: {
        type: String,
        required: true
    },
    sanction_dt: {
        type: Date,
        required: true
    },
    sanctioned_amount: {
        type: Number,
        required: true
    },
    disbursed_amount: {
        type: Number,
        required: true
    },
    date_of_disbursement: {
        type: Date,
        required: true
    },
    year_of_disbursement: {
        type: Number,
        required: true
    },
    fund_cycle: {
        type: Number,
        required: true
    },

});


module.exports = mongoose.model("fund", fundDisbursment);