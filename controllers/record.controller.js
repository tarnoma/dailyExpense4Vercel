const Record = require("../models/record.model");

const addNewRecord = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body can not be empty.",
    });
  }

  let data = new Record({
    user_id: req.id,
    category_id: req.body.category_id,
    spent_amount: req.body.spent_amount,
    date: req.body.date,
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

module.exports = {
  userGetRecords,
  addNewRecord,
};
