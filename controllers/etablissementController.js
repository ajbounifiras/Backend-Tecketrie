const etablissementModel = require("../models/etablissementModel");

exports.getAll = async (req, res) => {
  try {
    const etablissement = await etablissementModel.find();
    res.status(200).json({
      status: "success",
      data: etablissement,
    });
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
};
exports.getEtablissement = async (req, res) => {
  try {
    const etablissement = await etablissementModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: etablissement,
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
    const newEtablissement = await etablissementModel.create(req.body);

    res.status(200).json({
      status: "create succssefully",
      data: newEtablissement,
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
 await etablissementModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  .then(() => {
    res.status(200).send({
      message: "etablissement update successfully",
    });
  })
    .catch((err) => {
      res.status(404).json({
        status: "faild",
        message: err.message,
      });
    });
};
exports.delete = async (req, res) => {
  try {
    const etablissement = await etablissementModel.findByIdAndRemove(
      req.params.id
    );
    res.status(200).json({
      status: "create succssefully",
      data: etablissement,
    });
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
};
