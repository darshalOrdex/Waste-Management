const mongoose = require('mongoose');
const { Schema } = mongoose;

const BinSchema = new Schema({
    name: { type : String },
    locality: { type : String },
    landmark: { type : String },
    city: { type : String },
    loadtype: { type : String },
    drivers: { type : [String] } 
});

const Driver = mongoose.model('Bin', BinSchema)
Driver.createIndexes();
module.exports = Driver;