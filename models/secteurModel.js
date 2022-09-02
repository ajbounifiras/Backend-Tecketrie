const mongoose = require("mongoose");

var secteur = mongoose.Schema({
  nom: String,
  etat: {
    type: mongoose.Schema.Types.String,
    ref: "Etat",
  },
});
secteur.pre(/^find/, function (next) {
  this.populate({
    path: "_id",
    select: "-__v",
  });
  next();
});
var Secteur = mongoose.model("Secteur", secteur);
module.exports = Secteur;
