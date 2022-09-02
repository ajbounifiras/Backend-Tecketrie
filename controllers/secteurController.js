const secteurModel = require("../models/secteurModel");

exports.get = async (req, res) => {
  try {
    const secteur = await secteurModel.find();
    res.status(200).json(secteur);
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
};
exports.create = async (req, res) => {
  const secteur = new secteurModel(req.body);
  await secteur
    .save()
    .then(() => {
      res.status(200).send({
        message: "secteur create seccessfully",
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
    const secteur = await secteurModel.findById(req.params.id);
    res.status(200).json(secteur);
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
};
exports.update = async (req, res) => {
  const id = req.params.id;
  await secteurModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(() => {
      res.status(200).send({
        message: "secteur update successfully",
      });
    })
    .catch((error) => {
      res.status(404).send({
        message: error.message,
      });
    });
};
exports.delete = async (req, res) => {
  await secteurModel
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).send({
        message: "secteur delete successfully",
      });
    })
    .catch((error) => {
      res.status(404).send({
        message: error.message,
      });
    });
};
