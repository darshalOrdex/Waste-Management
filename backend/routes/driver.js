const express = require('express');
const Driver = require('../models/DriverModel');
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
                drivername:req.body.drivername,
                driveremail:req.body.driveremail,
                drivernumber:req.body.drivernumber,
                driveraddress:req.body.driveraddress,
                driverarea:req.body.driverarea,
                driverid:req.body.driverid,
            })
            const data = {
                user:{
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET)
            success = true;
            res.json({success,authtoken})
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
        let user = await Driver.findOne({email})
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
                id: user.id
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
module.exports = router