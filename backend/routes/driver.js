const express = require('express');
const Driver = require('../models/DriverModel');
const Complaint = require('../models/ComplaintModel');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET

router.post('/create',[
    body('name', 'Enter A Valid Name').isLength({ min: 3 }),
    body('email', 'Enter A Valid Email').isEmail(),
    body('password', 'Password Must Be Atleast 5 Character').isLength({ min: 5 })
    ],async (req,res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success = false
            return res.status(400).json({success,errors: errors.array() });
        }
        try {
            let user = await Driver.findOne({email: req.body.email})
            if(user)
            {   success = false;
                return res.status(400).json({success,error: "Sorry A Driver With This Email Already Exist"})
            }
            const salt = await bcrypt.genSalt(10)
            secPass = await bcrypt.hash(req.body.password, salt)
            user = await Driver.create({
                name:req.body.name,
                email:req.body.email,
                password: secPass,
                phonenumber:req.body.phonenumber,
                address:req.body.address,
                area:req.body.area,
                driverid:req.body.driverid,
            })
            success = true;
            res.json({success})
        }
        catch(error)
        {
            console.log(error.message);
            res.status(500).send("Internal Server Error Occurred");
        }
})

router.post('/login',[
    body('email', 'Enter A Valid Email').isEmail(),
    ],async (req,res) => {
    let success = false;
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }  
    try {
        const {email,password} = req.body;
        let user = await Driver.findOne({email})
        if(!user)
        {
            return res.status(400).send({error: "Please Try To Login With Correct Credentials"})
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare)
        {
            success = false
            return res.status(400).json({success, error: "Please Try To Login With Correct Credentials"})
        }
        const data = {
            user:{
                id: user.id,
                name : user.name,
                email : user.email,
                role: user.role
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({success, authtoken})
    }    
    catch(err)
    {
        console.log(err.message);
        res.status(500).send("Internal Server Error Occurred");
    }  
})

router.get("/getdrivers", async(req,res) => {
    let drivers = await Driver.find({});
    res.json({drivers})
})

router.put("/updatedriver/:id", async(req,res) => {
    try {
        const {name,email,password,phonenumber,address,area,driverid} = req.body;
        const id = req.params.id;
        let driver = await Driver.findById(id);
        if(!driver){return res.status(404).send("Not Found")}
        const newDriver = {};
        if(name) {newDriver.name = name}
        if(email) {newDriver.email = email}
        if(password.length > 0) {
            const salt = await bcrypt.genSalt(10)
            let secPass = await bcrypt.hash(password, salt)
            newDriver.password = secPass
        }
        if(phonenumber) {newDriver.phonenumber = phonenumber}
        if(address) {newDriver.address = address}
        if(area) {newDriver.area = area}
        if(driverid) {newDriver.driverid = driverid}
        driver = await Driver.findByIdAndUpdate(id, {$set: newDriver}, {new: true});
        res.json(driver);
    } catch (error) {
        console.log(err.message);
        res.status(500).send("Internal Server Error Occurred");
    }
})

router.get("/getdriverlocality/:id", async(req,res) => {
    try {
        const id = req.params.id;
        const complaint = await Complaint.findById(id);
        const locality = complaint.locality;
        const driver = await Driver.find({area: locality});
        res.json(driver)
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error Occurred");
    }
})

module.exports = router