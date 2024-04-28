const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    sptbi_id: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    employee_name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    joining_date: {
        type: Date,
        required: true
    },
    role_type: {
        type: String,
        required: true
    },
    exit_date: {
        type: Date,
        // required: true
    },

});

module.exports = mongoose.model('employee', employeeSchema);