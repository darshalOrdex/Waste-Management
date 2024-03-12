const express = require('express');
const router = express.Router();
const Admin = require('../models/AdminModel');
const User = require('../models/UserModel');
const Driver = require('../models/DriverModel');
const fetchuser = require("../middleware/fetchuser")

router.get('/verifyapi', fetchuser , async (req,res) => {
    try 
    {   let role = req.body.role;
        if(role === "Admin")
        {
            let userId = req.user.id;
            const user = await Admin.findById(userId).select("-password");
            res.send(user.role)
        }
        else if(role === "User") {
            let userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user.role)
        }
        else if(role === "Driver") {
            let userId = req.user.id;
            const user = await Driver.findById(userId).select("-password");
            res.send(user.role)
        }
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send("Internal Server Error Occurred");
    }
})

module.exports = router