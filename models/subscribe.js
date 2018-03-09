var mongoose = require("mongoose");

var subscribeSchema = new mongoose.Schema({
  email: String
});

module.exports = mongoose.model("Subscribe",subscribeSchema);
