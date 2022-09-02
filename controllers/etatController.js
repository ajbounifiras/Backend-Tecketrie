const etatModule = require("../models/etatModel");

exports.get = async (req, res) => {
  try {
    const etat = await etatModule.find();
    res.status(200).json(etat);
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
};
exports.create = async (req, res) => {
  const newetat = new etatModule({
    nom: req.body.nom,
  });
  await newetat
    .save()
    .then(() => {
      res.status(200).send({
        message: "etat create successfully",
      });
    })
    .catch((error) => {
      res.status(404).send({
        message: error.message,
      });
    });
};
exports.getone = async (req, res) => {
  try {
    const etat = await etatModule.findById(req.params.id);
    res.status(200).json(etat);
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
};
exports.update = async (req, res) => {
  const id = req.params.id;
  await etatModule
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(() => {
      res.status(200).send({
        message: "etat update successfully",
      });
    })
    .catch((error) => {
      res.status(404).send({
        message: error.message,
      });
    });
};
exports.delete = async (req, res) => {
  await etatModule
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).send({
        message: "etat delete successfully",
      });
    })
    .catch((error) => {
      res.status(404).send({
        message: error.message,
      });
    });
};
