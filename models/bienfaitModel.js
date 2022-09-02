const { string } = require('joi');
const mongoose=require('mongoose')

var bienfait = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "service must have a name"],
  },
  description: {
    type: String,
    required: [true, "service must have a description "],
  },
  image:{
    type:String,
    required: [true, "service must have an image "],
  },
  etablissement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Etablissement",
  },
});
bienfait.pre(/^find/, function () {
  this.populate({
    path: "etablissement",
    select: "name",
  });

});

const Bienfait=mongoose.model('Bienfait',bienfait)
module.exports=Bienfait