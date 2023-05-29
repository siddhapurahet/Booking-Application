const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const app = express();

const checkForConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to mongoDB");
    }catch(error){
        throw error;
    }
};

app.listen(3000, () => {
    checkForConnection();
    console.log("Connected to backend...");
})