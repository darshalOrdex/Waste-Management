const express = require('express');
const User = require('../models/UserModel');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const Complaint = require('../models/ComplaintModel');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET

router.post('/signup',[
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
            let user = await User.findOne({email: req.body.email})
            if(user)
            {   success = false;
                return res.status(400).json({success,error: "Sorry A User With This Email Already Exist"})
            }
            const salt = await bcrypt.genSalt(10)
            secPass = await bcrypt.hash(req.body.password, salt)
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
                phonenumber: req.body.phonenumber,
                city: req.body.city
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
    body('password', 'Password Cannot Be Blank').exists()
    ],async (req,res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({error: "Please Try To Login With Correct Credentials"})
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
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken});
    }    
    catch(err)
    {
        console.log(err.message);
        res.status(500).send("Internal Server Error Occurred");
    }  
})

router.get("/getallusers",fetchuser,async(req,res) => {
    try {
        if(req.user.role === "Admin") {
            const users = await User.find({}).select("-password");
            res.json(users)
        }
    } catch (error) {
        console.log(err.message);
        res.status(500).send("Internal Server Error Occurred");
    }
})

router.get("/getcomplaints",fetchuser,async(req,res) => {
    try {
        const complaints = await Complaint.find({userId : req.user.id})
        if(!complaints){
            return res.status(401).json('No Record Found')
        }
        res.json(complaints);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get("/getuser",fetchuser,async(req,res) => {
    try {
        const user = await User.findOne({email : req.user.email})
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.put("/updateuser/:id",async(req,res) => {
    try {
        let user = await User.findById(req.params.id)
        if(!user) {return res.status(401).json('No Record Found')}
        const {name,email,password,phonenumber,city} = req.body;
        const newUser = {};
        if(name) {newUser.name = name}
        if(email) {newUser.email = email}
        if(password.length > 0) {
            const salt = await bcrypt.genSalt(10)
            let secPass = await bcrypt.hash(password, salt)
            newUser.password = secPass
        }
        if(phonenumber) {newUser.phonenumber = phonenumber}
        if(city) {newUser.city = city}
        user = await User.findByIdAndUpdate(req.params.id, {$set: newUser}, {new: true});
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router