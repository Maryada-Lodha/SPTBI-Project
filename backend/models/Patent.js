const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patentSchema = new Schema({
    sptbi_id: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    patent_application_no: {
        type: String,
        required: true
    },
    date_of_application: {
        type: Date,
        required: true
    },
    patent_title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    publication_no: {
        type: String,
        required: true
    },
    publication_date: {
        type: Date,
        required: true
    },
    publication_year: {
        type: Number,
        required: true
    },
    publication_country_name: {
        type: String,
        required: true
    },
    publication_country_code: {
        type: String,
        required: true
    },
    applicants_name: {
        type: String,
        required: true
    },
    link_of_source: {
        type: String,
        required: true
    },
    type_of: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('patent', patentSchema);