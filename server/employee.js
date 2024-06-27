const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String
});
const emplyeemodel = mongoose.model('employees', employeeSchema);
module.exports = emplyeemodel;