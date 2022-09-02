const userModel = require("../models/userModel");
const bcrybt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const validation = require("../middelware/validation");

dotenv.config();
process.env.TOKEN_SECRET;
exports.getAll = async (req, res) => {
  try {
    const user = await userModel.find();
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
};
exports.register = async (req, res) => {
  try {
    // let results = validation.validate(req.body);
    // if (results.error)
    //   return res.status(400).send(results.error.details[0].message);
    let newphoneNumber = await bcrybt.hash(req.body.phoneNumber, 10);
    const newUser = new userModel({
      userName: req.body.userName,
      phoneNumber: newphoneNumber,
    });
    await newUser.save().then(() => {
      res.status(200).json({
        status: "create successfully",
        data: newUser,
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
  const user = await userModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(() => {
      res.status(200).json({
        status: "update successfully",
        data: user,
      });
    })
    .catch((err) => {
      res.status(404).json({
        status: "faild",
        message: error.message,
      });
    });
};
exports.delete = async (req, res) => {
  try {
    const user = await userModel.findByIdAndRemove(req.params.id);
    res.status(200).json({
      status: "delete successfully",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
};
exports.login = async (req, res) => {
  const user = await userModel.findOne({ userName: req.body.userName });
  if (user && (await bcrybt.compare(req.body.phoneNumber, user.phoneNumber))) {
    let token = jwt.sign(req.body.userName, process.env.TOKEN_SECRET);
    return res.send({
      userName: user.userName,
      token: token,
    });
  } else {
    res.send("user Invalid");
  }
};
