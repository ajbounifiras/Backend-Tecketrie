const mongoose = require("mongoose");

var user = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "user must have a userName"],
  },
  phoneNumber: {
    type: String,
    required: [true, "must enter your phone number"],
  },
});

const User = mongoose.model("User", user);
module.exports = User;
