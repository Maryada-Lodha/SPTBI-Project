const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fundRaisedSchema = new Schema({
    sptbi_id: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    financial_year: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date_of_fund_raised: {
        type: Date,
        required: true
    },
    type_of_funding: {
        type: String,
        required: true
    },
    funding_agency: {
        type: String,
        // required: true
    },
    valuation: {
        type: Number,
        // required: true
    },
});

module.exports = mongoose.model('fundRaised', fundRaisedSchema);