const reservationModel=require('../models/reservationModel');

exports.get=async(req,res)=>{
    try {
      const reservation=await reservationModel.find()
      res.status(200).json({
        status:'success',
        data:reservation
      })  
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
};
exports.getOne=async(req,res)=>{
    try {
        const reservation=await reservationModel.findById(req.params.id);
        res.status(2000).json({
            status:'success',
            data:reservation
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
};
exports.create=async(req,res)=>{
    try {
       const newreservation=await reservationModel.create(req.body) 
       res.status(200).json({
        status: "create succssefully",
        data: newreservation,
      });
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message,
      });
    }
};
exports.update=async(req,res)=>{
    const id=req.params.id
    await reservationModel.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
    .then(()=>{
        res.status(200).send({
            message: "reservation update successfully",
          });
        })
          .catch((err) => {
            res.status(404).json({
              status: "faild",
              message: err.message,
            });
      });
};
exports.delete=async(req,res)=>{
    await reservationModel.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(200).send({
            message: "reservation delete successfully",
          });
        })
          .catch((err) => {
            res.status(404).json({
              status: "faild",
              message: err.message,
            });
      });
}