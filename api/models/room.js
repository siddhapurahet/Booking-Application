const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true
  },
  maxPeople: {
    type: Number,
    required: true
  },
  roomNumber: [{roomnumber: Number, unavailablerooms: [{type: [Date]}]}],
}, 
{timestamps: true}
);

module.exports = mongoose.model("roomSchema", RoomSchema);