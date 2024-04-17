const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComplaintSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: { type : String },
    locality: { type : String },
    landmark: { type : String },
    city: { type : String },
    complaint: {type : String},
    complaintImage: {type : String},
    driverImage: {type : String},
    driveremail: { type : String },
    latitude: { type : Number }, 
    longitude: { type : Number },
    status: { type: String, default: "Pending"}
});

const Complaint = mongoose.model('Complaint', ComplaintSchema)
Complaint.createIndexes();
module.exports = Complaint;