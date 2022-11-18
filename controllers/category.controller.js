const Category = require("../models/category.model");

const userGetParentCategory = (req, res) => {
  Category.getCategory(1, NULL, (err, result) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Error while user are retriveing parent category.",
      });
    } else res.send(result);
  });
};

const userGetChildCategory = (req, res) => {
  Category.getCategory(1, req.params.id, (err, result) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Error while user are retriveing child category.",
      });
    } else res.send(result);
  });
};

const adminGetParentCategory = (req, res) => {
  Category.getCategory(0, NULL, (err, result) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Error while retriveing parent category for admin.",
      });
    } else res.send(result);
  });
};

const adminDeleteCategory = (req, res) => {
  Category.deleteById(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error while deleting category.",
      });
    } else res.send(result);
  });
};

const adminGetChildCategory = (req, res) => {
  Category.getCategory(0, req.params.id, (err, result) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Error while retriveing child category for admin.",
      });
    } else res.send(result);
  });
};

const adminAddCategory = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body can not be empty.",
    });
  }

  const category = new Category({
    parent: req.body.parent,
    name: req.body.name,
    icon: req.body.icon,
    src: req.body.src,
  });

  Category.add(category, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error while adding category.",
      });
    } else res.send(result);
  });
};

const adminUpdateCategory = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body can not be empty.",
    });
  }

  const category = new Category({
    parent: req.body.parent,
    name: req.body.name,
    icon: req.body.icon,
    src: req.body.src,
  });

  Category.updateById(req.params.id, category, (err, result) => {
    if (err) {
      if (err.msg == "not_found") {
        res.status(401).send({
          message: "Not found category id: " + req.params.id,
        });
      } else {
        res.status(500).send({
          message: "Error updating category id: " + req.params.id,
        });
      }
    } else res.send(result);
  });
};

module.exports = {
  adminAddCategory,
  adminDeleteCategory,
  adminGetChildCategory,
  adminGetParentCategory,
  adminUpdateCategory,
  userGetChildCategory,
  userGetParentCategory,
};
