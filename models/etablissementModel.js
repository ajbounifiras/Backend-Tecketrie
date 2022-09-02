const mongoose = require("mongoose");

var etablissement = new mongoose.Schema({
  name: String,
  description: String,
  etat: {
    type: mongoose.Schema.Types.String,
    ref: "Etat",
  },
  secteur: {
    type: mongoose.Schema.Types.String,
    ref: "Secteur",
  },
});
etablissement.pre(/^find/, function (next) {
  this.populate({
    path: "_id",
    select: "-__v",
  }).populate({
    path: "_id",
    select: "-__v",
  });
  next();
});

const Etablissement = mongoose.model("Etablissement", etablissement);
module.exports = Etablissement;
