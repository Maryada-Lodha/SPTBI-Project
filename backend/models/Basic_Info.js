const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const basicInfoSchema = new Schema({
    sptbi_id: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    supported_program: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    funding_type: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    aggrement_date: {
        type: Date,
        // required: true
    },
    program_start_date: {
        type: Date,
        // required: true
    },
    end_date: {
        type: Date,
        // required: true
    },
    timeline_in_months: {
        type: Number,
        // required: true
    },
    year_of_incubaion: {
        type: String,
        // required: true
    },
    year_of_graduation: {
        type: String,
        // required: true
    },
    no_of_founders: {
        type: Number,
        // required: true
    },
    no_of_women_founders: {
        type: Number,
        required: true
    },
    name_of_founders: {
        type: String,
        // required: true
    },
    spit_connection: {
        type: String,
        required: true
    },
    website: {
        type: String,
        // required: true
    },
    company_email: {
        type: String,
        // required: true
    },
    founder_email: {
        type: String,
        // required: true
    },
    company_address: {
        type: String,
        // required: true
    },
    company_city: {
        type: String,
        // required: true
    },
    company_state: {
        type: String,
        // required: true
    },
    company_pin: {
        type: String,
        // required: true
    },
    date_of_incorporation: {
        type: Date,
        // required: true
    },
    certificate_of_incorporation: {
        type: String,
        // required: true
    },
    dpiit_no: {
        type: String,
        // required: true
    },
    pan_no: {
        type: String,
        // required: true
    },
    tan: {
        type: String,
        // required: true
    },
    gstn: {
        type: String,
        // required: true
    },
    any_other_name_reference: {
        type: String,
        // required: true
    },
    current_stage: {
        type: String,
        // required: true
    },
    trl: {
        type: String,
        // required: true
    },
    agreement_status: {
        type: String,
        // required: true
    },
    funded_amount: {
        type: Number,
        required: true
    },
    date_of_admission: {
        type: Date,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },


});

module.exports = mongoose.model('basicInfo', basicInfoSchema);
