const contactModel=require("../models/contactModel")

exports.getAll=async(req,res)=>{
    try {
    const contact=await contactModel.find()
    res.status(200).json({
        status:'success',
        data:contact
    })
    } catch (error) {
       res.status(404).json({
        status:'faild',
         message:error.message
       }) 
    }
}
exports.getone=async(req,res)=>{
    try {
    const contact=await contactModel.findById(req.params.id)
    res.status(200).json({
        status:'success',
        data:contact
    })
    } catch (error) {
        res.status(404).json({
            status:'faild',
             message:error.message
           })   
    }
}
exports.create=async(req,res)=>{
    try {
    const newcontact=new contactModel(req.body)
    await newcontact.save().then(()=>{
        res.status(200).json({
        status:'success',
        data:newcontact
        })
    })    
    } catch (error) {
        res.status(404).json({
            status:'faild',
             message:error.message
           })     
    }
}
exports.update=async(req,res)=>{
 const id=req.params.id
 const newcontact=await contactModel.findByIdAndUpdate(id,req.body,{useFindAndModify: false,}).then(()=>{
    res.status(200).json({
        status:'success',
        data:newcontact
        })
 }).catch(error=>{
    res.status(404).json({
        status:'faild',
         message:error.message
       }) 
 })
}
exports.delete=async(req,res)=>{
    const newcontact=await contactModel.findByIdAndRemove(req.params.id).then(()=>{
        res.status(200).json({
            status:'success',
            data:newcontact
            })
     }).catch(error=>{
        res.status(404).json({
            status:'faild',
             message:error.message
           }) 
     }) 
}