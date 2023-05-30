const authRoute = require("./api/routes/auth.js");
const hotelsRoute = require("./api/routes/hotels.js");
const roomsRoute = require( "./api/routes/rooms.js");
const usersRoute = require("./api/routes/users.js");

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const checkForConnection = async () => {   //to check if the mongoose is connected to monogoDB or not.
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to mongoDB");
    }catch(error){
        throw error;
    }
};

// Event listener for connection error
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.listen(3000, () => {
    checkForConnection();
    console.log("Connected to backend...");
})


//Middleware
app.use(express.json());
app.use("/auth", authRoute);
app.use("/hotels", hotelsRoute);
app.use("/users", usersRoute);
app.use("/rooms", roomsRoute);