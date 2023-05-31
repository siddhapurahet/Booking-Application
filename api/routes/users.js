const express = require("express");
const router = express.Router();
const userschema = require("../models/user.js");

//DELETE
router.delete("/:id", async(req, res) => {

    try{
        const deleteuser = await userschema.findByIdAndDelete(req.params.id);
        res.status(200).json(deleteuser);

    }
    catch(err){
        res.status(500).json(err);
    }
})

//UPDATE
router.put("/:id", async(req, res) => {

    try{
        const updatedvalues = await userschema.findByIdAndUpdate(req.params.id, {$set: req.body});
        userschema.updatedvalues.save();
        res.status(200).json(updatedvalues);

    }
    catch(err){
        res.status(500).json(err);
    }
})
//GET
router.get("/:id", async(req, res) => {

    try{
        const updatedvalues = await userschema.findById(req.params.id);
        res.status(200).json(updatedvalues);

    }
    catch(err){
        res.status(500).json(err);
    }
})

//GET ALL
router.get("/", async(req, res) => {

    try{
        const values = await userschema.find();
        res.status(200).json(values);

    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;