const express = require("express");
const roomSchema = require("../models/room.js");
const hotelSchema = require( "../models/hotel.js");
const router = express.Router();

router.post("/createroom", async (req, res) => {
    
    const hotelid = req.params.hotelid;
    const newroom = new roomSchema(req.body);

    try{
        const savedroom = await newroom.save();
        try{
            await hotelSchema.findByIdAndUpdate(hotelid, {$push: {rooms: savedroom._id}});
        }
        catch(err){
           res.status(500).json(err);
        }
        res.status(200).json(savedroom);
    }
    catch(err){
            res.status(500).json(err);
    }
})

router.delete("/deleteroom/:id", async(req, res) => {

    try{
        const deletedroom = await roomSchema.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedroom);

    }
    catch(err){
        res.status(500).json(err);
    }
})

//UPDATE
router.put("/updateroom/:id", async(req, res) => {

    try{
        const updatedvalues = await roomSchema.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(updatedvalues);

    }
    catch(err){
        res.status(500).json(err);
    }
})
//GET
router.get("/getrooms/:id", async(req, res) => {

    try{
        const updatedvalues = await roomSchema.findById(req.params.id);
        res.status(200).json(updatedvalues);

    }
    catch(err){
        res.status(500).json(err);
    }
})

//GET ALL
router.get("/getallrooms", async(req, res) => {

    try{
        const values = await roomSchema.find();
        res.status(200).json(values);

    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports  = router;