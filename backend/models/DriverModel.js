const mongoose = require('mongoose');
const { Schema } = mongoose;

const DriverSchema = new Schema({
    drivername:{type: string},
    driveremail: {type: string},
    drivernumber: {type: string},
    driveraddress: {type: string},
    driverarea: {type: string},
    driverid: {type: string},
    role: {type: string, default: "Driver"},
    date:{type: Date, default: Date.now},
});

const Driver = mongoose.model('Driver', DriverSchema)
Driver.createIndexes();
module.exports = Driver;