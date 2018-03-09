var mongoose = require("mongoose");

var registerSchema = new mongoose.Schema({
  name: String,
  email: String,
  contactNumber: String,
  venue: String,
  date: String,
  dateVenueId: [{
    type: String //array of date to keep a track on participants history... data not overrrided
  }],
  mineralRating: { type: Number, default: 1200 }

});
//name
//Email
//Contact Number
//date created
//Date
//venue
//MineralRating
//check for emailId on database--if present update(add date) else create database
module.exports = mongoose.model("MineralRegister",registerSchema);
