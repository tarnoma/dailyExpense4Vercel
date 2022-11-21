const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const registerNewUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body can not be empty.",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const userObj = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, salt),
    img: req.body.img,
  });

  User.register(userObj, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error at: register!",
      });
    } else res.send(result);
  });
};

const loginUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body can not be empty.",
    });
  }

  const account = new User({
    username: req.body.username,
    password: req.body.password,
  });
  User.login(account, (err, result) => {
    if (err) {
      if (err.msg == "not_found") {
        res.status(401).send({
          message: "Not found " + req.body.username,
        });
      } else if (err.msg == "invalid_pass") {
        res.status(401).send({
          message: "Invalid Password",
        });
      } else {
        res.status(500).send({
          message: "Error retriveing " + req.body.username,
        });
      }
    } else res.send(result);
  });
};

const checkUsername = (req, res) => {
  User.checkUsername(req.params.user, (err, data) => {
    if (err) {
      if (err.msg == "not_found") {
        res.send({
          message: "Not found " + req.params.user,
          valid: true,
        });
      } else {
        res.status(500).send({
          message: "Error retriveing " + req.params.user,
        });
      }
    } else res.send({ record: data, valid: false });
  });
};

const getAllUsers = (req, res) => {
  User.getAllUsers((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error while retriveing users.",
      });
    } else res.send(data);
  });
};

const toggleActive = (req, res) => {
  User.toggleActiveById(req.params.id, req.body.active, (err, result) => {
    if (err) {
      if (err.msg == "not_found") {
        res.status(401).send({
          message: "Not found user id: " + req.params.id,
        });
      } else {
        res.status(500).send({
          message: "Error update user id: " + req.params.id,
        });
      }
    } else res.send(result);
  });
};

module.exports = {
  toggleActive,
  getAllUsers,
  checkUsername,
  loginUser,
  registerNewUser,
};
