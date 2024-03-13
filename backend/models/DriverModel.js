const mongoose = require('mongoose');
const { Schema } = mongoose;

const DriverSchema = new Schema({
    name:{type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phonenumber: {type: String},
    address: {type: String},
    area: {type: String},
    driverid: {type: String},
    role: {type: String, default: "Driver"},
    date:{type: Date, default: Date.now},
});

const Driver = mongoose.model('Driver', DriverSchema)
Driver.createIndexes();
module.exports = Driver;