const mongoose = require("mongoose");

var etat = mongoose.Schema({
  nom: String,
});

var Etat = mongoose.model("Etat", etat);
module.exports = Etat;
