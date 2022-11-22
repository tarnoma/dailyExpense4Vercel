const Record = require("../models/record.model");

const addNewRecord = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body can not be empty.",
    });
  }
  let d = new Date();
  let data = new Record({
    user_id: req.id,
    category_id: req.body.category_id,
    spent: req.body.spent,
    date: d.toLocaleDateString(),
  });
  Record.add(data, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error at: add category!",
      });
    } else res.send(result);
  });
};

const userGetRecords = (req, res) => {
  Record.getRecords(req.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error while records for users.",
      });
    } else res.send(data);
  });
};

const userGetRecordsAndCat = (req, res) => {
  Record.getRecordsAndCat(req.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error while records for users.",
      });
    } else res.send(data);
  });
};

const userDeleteRecord = (req, res) => {
  Record.deleteRecord(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error while deleting category.",
      });
    } else res.send(data);
  });
};

module.exports = {
  userGetRecords,
  addNewRecord,
  userGetRecordsAndCat,
  userDeleteRecord,
};
