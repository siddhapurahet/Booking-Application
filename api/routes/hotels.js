const hotelSchema = require("../models/hotel.js");

const express = require("express");
const router = express.Router();

//CREATE
router.post("/", async(req, res) => {

    const newHotel = new hotelSchema(req.body);

    try{
        //const savehotel = await newHotel.save();
        res.status(200).json(await newHotel.save());
    }
    catch(err){
        res.status(500).json(err);
    }
})

//DELETE
router.delete("/:id", async(req, res) => {

    try{
        const deletedhotel = await hotelSchema.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedhotel);

    }
    catch(err){
        res.status(500).json(err);
    }
})

//UPDATE
router.put("/:id", async(req, res) => {

    try{
        const updatedvalues = await hotelSchema.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(updatedvalues);

    }
    catch(err){
        res.status(500).json(err);
    }
})
//GET
router.get("/findbyid/:id", async(req, res) => {

    try{
        const updatedvalues = await hotelSchema.findById(req.params.id);
        res.status(200).json(updatedvalues);

    }
    catch(err){
        res.status(500).json(err);
    }
})

//GET ALL
router.get("/", async(req, res) => {

    try{
        const values = await hotelSchema.find();
        res.status(200).json(values);

    }
    catch(err){
        res.status(500).json(err);
    }
})

//COUNT BY CITY
router.get("/countbycity", async(req, res) => {

    const cities = req.query.cities.split(",");    
    try{
        const countbycityvalues = await Promise.all(cities.map(city => {
            return hotelSchema.countDocuments({city: city});
        }))
        res.status(200).json(countbycityvalues);

    }
    catch(err){
        res.status(500).json(err);
    }
})

//COUNTBY TYPE
router.get("/countbytype", async(req, res) => {

    try{
        const values = await hotelSchema.find();
        res.status(200).json(values); 

    }
    catch(err){  
        res.status(500).json(err);
    }
})

module.exports = router;