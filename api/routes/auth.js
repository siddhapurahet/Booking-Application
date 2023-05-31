const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const userschema = require("../models/user.js");
//import {verifyUser, verifytoken} from "../verifyCredential.js";


router.post("/register", async (req, res) => {
    
    try{
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(req.body.password, salt);

     const newUser = new userschema({
        username: req.body.username,
        email: req.body.email,
        password: hashedpassword
     });

     await newUser.save();
     res.status(200).send("User created");
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post("/login", async (req, res) => {
    
    try{
        const user = await userschema.findOne({username: req.body.username});
        if(!user){
            return createError(400, "Usernmae not found");
        }
        const is_passwordcorrect = await bcrypt.compareSync(req.body.password, user.password);
        if(!is_passwordcorrect){
            return createError(400, "Wrong username or password");
        }
        const jwt_Token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.secretkey);
        res.cookie("logindata", jwt_Token, {httpOnly: true});
        res.status(200).json(user);
    } 
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;