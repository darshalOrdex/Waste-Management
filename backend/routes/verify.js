const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")

router.get('/verifyapi', fetchuser , async (req,res) => {
    try 
    {   
        const role = req.user.role;
        const name = req.user.name;
        res.json({role,name});
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send("Internal Server Error Occurred");
    }
})

module.exports = router