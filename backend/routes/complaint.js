const express = require('express');
const router = express.Router();
const Complaint = require("../models/ComplaintModel");
const fetchuser = require("../middleware/fetchuser");

router.post("/generatecomplaint", fetchuser ,async(req,res) => {
    try {
        const {complaint, name, locality, landmark, city, driveremail, latitude, longitude, status} = req.body;
        const userComplaint = new Complaint({
            userId : req.user.id, name, locality, landmark, city, driveremail, latitude, longitude, status, complaint
        })
        const savedComplaint = await userComplaint.save()
        res.json(savedComplaint);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get("/getcomplaints",fetchuser,async(req,res) => {
    try {
        const complaints = await Complaint.find({driveremail : req.user.email})
        if(!complaints){
            return res.status(401).json('No Record Found')
        }
        res.json(complaints);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get("/getallcomplaints",async(req,res) => {
    try{
       let complaints = await Complaint.find({});
       res.json(complaints);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get("/getcomplaint/:id", async (req, res)=>{
    const id = req.params.id;
    try {
        const complaints = await Complaint.findById(id);
        if(!complaints){
            return res.status(401).json('No Record Found')
        }
        res.json(complaints);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.put("/updatecomplaint/:id", async (req, res)=>{
    const id = req.params.id;
    try {
        const complaints = await Complaint.findById(id);
        if(!complaints){
            return res.status(401).json('No Record Found')
        }
        const { status } = req.body;
        const newComplaint = await Complaint.findByIdAndUpdate(id, {status : status}, {new: true});
        res.json(newComplaint);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/userimagecomplaint",fetchuser,async (req, res)=>{
    try {
        const {complaint, locality, city, latitude, longitude, complaintImage} = req.body;
        const userComplaint = new Complaint({
            userId : req.user.id, locality, city, latitude, longitude, complaint, complaintImage 
        })
        const savedComplaint = await userComplaint.save()
        res.json(savedComplaint);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.put("/assigndriver/:id", async (req, res)=>{
    const id = req.params.id;
    try {
        const complaints = await Complaint.findById(id);
        if(!complaints){
            return res.status(401).json('No Record Found')
        }
        const { driveremail } = req.body;
        const newComplaint = await Complaint.findByIdAndUpdate(id, { $set: {driveremail: driveremail}}, {new: true});
        res.json(newComplaint);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.put("/updatecomplaintimage/:id", async (req, res)=>{
    const id = req.params.id;
    try {
        const complaints = await Complaint.findById(id);
        if(!complaints){
            return res.status(401).json('No Record Found')
        }
        const { driverImage } = req.body;
        const newComplaint = await Complaint.findByIdAndUpdate(id, { $set: {driverImage: driverImage}}, {new: true});
        res.json(newComplaint);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router