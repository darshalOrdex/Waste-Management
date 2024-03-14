const express = require('express');
const router = express.Router();
const Bin = require('../models/BinModel');

router.post('/addbin', async (req,res) => {
    try
    {
        const{name,locality,landmark,city,loadtype,driveremail,latitude,longitude} = req.body; 
        const note = new Bin({
            name,locality,landmark,city,loadtype,driveremail,latitude,longitude
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

router.get("/getbins",async(req,res) => {
    try
    {
       const bins=await Bin.find({});    
       if(!bins || bins.length==0){return res.status(404).json("No Bins Found")};
       res.json({bins})
    }
    catch(err)
    {
      return res.status(400).json("Error Fetching Data from Database");
    }
})

router.get("/getbin/:id",async(req,res) => {
    try
    {
       const bins = await Bin.findById(req.params.id);
       if(!bins){return res.status(404).json("No Bin Found")};
       res.json({bins})
    }
    catch(err)
    {
      return res.status(400).json("Error Fetching Data from Database");
    }
})

module.exports = router