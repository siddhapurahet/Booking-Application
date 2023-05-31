const authRoute = require("./api/routes/auth.js");
const hotelsRoute = require("./api/routes/hotels.js");
const roomsRoute = require( "./api/routes/rooms.js");
const usersRoute = require("./api/routes/users.js");

const cookie_parser = require("cookie-parser");
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
        console.log(error);
    }
};

// Event listener for connection error
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    checkForConnection();
    console.log(`Listening on port ${port}`);
})


//Middleware
app.use(cookie_parser());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/hotels", hotelsRoute);
app.use("/users", usersRoute);
app.use("/rooms", roomsRoute);