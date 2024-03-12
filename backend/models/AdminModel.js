const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
    name:{type: String},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    role:{type: String, default: "Admin"},
    date:{type: Date, default: Date.now},
});

const Admin = mongoose.model('Admin', AdminSchema)
Admin.createIndexes();
module.exports = Admin;