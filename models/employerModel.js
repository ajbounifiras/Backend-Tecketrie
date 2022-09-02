const mongoose = require("mongoose");

let employer = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  role: String,
});

let Employer = mongoose.model("Employer", employer);
module.exports = Employer;
