
const mongoose=require("mongoose")

var contact=new mongoose.Schema({
    userName:String,
    email:String,
    phoneNumber:Number,
    message:String,

})

const Contact=mongoose.model('Contact',contact)
module.exports=Contact;