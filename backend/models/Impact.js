const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const impactSchema = new Schema({
    sptbi_id: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    revenue: {
        type: Number,
        required: true
    },
    investment: {
        type: Number,
        required: true
    },
    employment_generated: {
        type: Number,
        required: true
    },
    patent_filled: {
        type: Number,
        required: true
    },
    awards: {
        type: Number,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('impact', impactSchema);