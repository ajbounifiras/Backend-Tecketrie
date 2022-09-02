const employerModel = require("../models/employerModel");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const validation = require("../middelware/validation");

dotenv.config();
process.env.TOKEN_SECRET;

exports.getAll = async (req, res) => {
  try {
    const employer = await employerModel.find();
    res.status(200).json({
      status: "success",
      data: employer,
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
    const employer = await employerModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: employer,
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
    let results = validation.validate(req.body);
    if (results.error)
      return res.status(400).send(results.error.details[0].message);
    let newpassword = await bcrypt.hash(req.body.password, 10);
    const newemployer = new employerModel({
      userName: req.body.userName,
      email: req.body.email,
      password: newpassword,
      role: req.body.role,
    });
    await newemployer.save().then(() => {
      res.status(200).json({
        status: "employer create successfully",
        data: newemployer,
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
  try {
    const id = req.params.id;
    const employer = await employerModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    res.status(200).json({
      status: "update successfuly",
      data: employer,
    });
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
};
exports.deleteData = async (req, res) => {

try {
  const employer=await employerModel.findByIdAndDelete(req.params.id)
  res.status(200).json({
    status:'success',
    data:employer
  })
} catch (error) {
  res.status(404).json({
    status: "faild",
    message: error.message,
  });
}
}

exports.login = async (req, res) => {
  const employer = await employerModel.findOne({ userName: req.body.userName });
  if (
    employer &&
    (await bcrypt.compare(req.body.password, employer.password))
  ) {
    let token = jwt.sign(req.body.userName, process.env.TOKEN_SECRET);
    return res.send({
      userName: employer.userName,
      token: token,
      role: employer.role,
    });
  } else {
    res.send("employer Invalid");
  }
};
