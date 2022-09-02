const BienfaitModel=require('../models/bienfaitModel')

exports.getAll = async (req, res) => {
  try {
    const bienfait = await BienfaitModel.find();
    res.status(200).json({
      status: "success",
      data: bienfait,
    });
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
};

exports.getService = async (req, res) => {
  try {
    const bienfait = await BienfaitModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: bienfait,
    });
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
};
exports.create = async (req, res) => {
  try {
    const newbienfait = new  BienfaitModel({
      name:req.body.name,
      description:req.body.description,
      image:req.body.image,
      etablissement:req.body.etablissement,
    });
    await newbienfait.save().then(() => {
      res.status(200).json({
        status: "create successfully",
        data: newbienfait,
      });
    });
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
};
exports.update = async (req, res) => {
  const id = req.params.id;
  await BienfaitModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(() => {
      res.status(200).send({
        message: "bienfait update successfully",
      });
    })
    .catch((error) => {
      res.status(404).send({
        message: error.message,
      });
    });
};
exports.delete = async (req, res) => {
  try {
    const bienfait = await BienfaitModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "delete successfully",
      data: bienfait,
    });
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
};