const express = require('express');
const router = express.Router();
const Bin = require('../models/BinModel');

router.post('/addbin', async (req,res) => {
    try
    {
        const{name,locality,landmark,city,loadtype,drivers} = req.body; 
        const note = new Bin({
            name,locality,landmark,city,loadtype,drivers
        })
        const savedNote = await note.save();
        res.json(savedNote);
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send("Internal Server Error Occurred"); //Mongo DB Could Be Down
    }
})

module.exports = router