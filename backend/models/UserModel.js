const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{type: String},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    phonenumber: {type: String, unique: true},
    city:{type: String},
    role:{type: String, default: "User"},
    date:{type: Date, default: Date.now},
});

const User = mongoose.model('User', UserSchema)
User.createIndexes();
module.exports = User;