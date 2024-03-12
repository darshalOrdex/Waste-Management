const mongoose = require('mongoose');
const { Schema } = mongoose;

const DriverSchema = new Schema({
    drivername:{type: String},
    driveremail: {type: String, required: true},
    driverpassword: {type: String, required: true},
    drivernumber: {type: String},
    driveraddress: {type: String},
    driverarea: {type: String},
    driverid: {type: String},
    role: {type: String, default: "Driver"},
    date:{type: Date, default: Date.now},
});

const Driver = mongoose.model('Driver', DriverSchema)
Driver.createIndexes();
module.exports = Driver;