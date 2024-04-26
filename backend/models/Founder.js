const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const founderSchema = new Schema({
    sptbi_id: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    founder_name: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    working_experience: {
        type: String,
        required: true
    },
    din_no: {
        type: String,
        required: true
    },
});
