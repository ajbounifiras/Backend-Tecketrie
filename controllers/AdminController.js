const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const validation = require("../middelware/validation");

dotenv.config();
process.env.TOKEN_SECRET;
exports.getAll = async (req, res) => {
  try {
    const admin = await adminModel.find();
    res.status(200).json({
      status: "success",
      data: admin,
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
    const admin = await adminModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: admin,
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
    const newadmin = new adminModel({
      userName: req.body.userName,
      email: req.body.email,
      password: newpassword,
      role: req.body.role,
     
    });
    await newadmin.save().then(() => {
      res.status(200).json({
        status: "user create successfully",
        data: newadmin,
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
    const admin = await adminModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    res.status(200).json({
      status: "update successfuly",
      data: admin,
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
    const admin=await adminModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status:'success',
      data:admin
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
  }
exports.login = async (req, res) => {
  const admin = await adminModel.findOne({ email: req.body.email });
  if (admin && (await bcrypt.compare(req.body.password, admin.password))) {
    let token = jwt.sign(req.body.email, process.env.TOKEN_SECRET);
    return res.send({
      email: admin.email,
      userName:admin.userName,
      token: token,
      role: admin.role,
    });
  } else {
    res.send("user Invalid");
  }
};
