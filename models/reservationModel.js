const mongoose=require('mongoose')

var reservation= new mongoose.Schema({

    name:String,
    phone:Number,
    Date:String,
    person:Number,

    bienfait : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bienfait",
    },
    etablissement:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Etablissement",
    },
    secteur : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Secteur",
    },
    etat : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Etat",
    }
});
reservation.pre(/^find/, function () {
    this.populate({
        path: "bienfait",
        select: "name",
    }).populate({
        path: "etablissement",
        select: "name", 
    }).populate({
        path: "secteur",
        select: "nom",
    }).populate({
        path: "etat",
        select: "nom",
    })
  
})

const Reservation=mongoose.model('Reservation',reservation);
module.exports=Reservation;