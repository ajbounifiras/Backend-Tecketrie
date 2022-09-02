const mongoose = require("mongoose");

var admin = new mongoose.Schema({
  id: String,
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {},
  role: String,

});

const Admin = mongoose.model("Admin", admin);
module.exports = Admin;
