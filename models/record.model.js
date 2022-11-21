const sql = require("./db.model");

const Record = function (record) {
  this.user_id = record.user_id;
  this.category_id = record.category_id;
  this.spent_amount = record.spent_amount;
  this.date = record.date;
};

Record.add = (data, result) => {
  sql.query("INSERT INTO m_records SET ?", data, (err, res) => {
    if (err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    console.log("Record added: ", {
      id: res.insertId,
      ...data,
    });
    result(null, {
      id: res.insertId,
      ...data,
    });
  });
};

Record.getRecords = (id, result) => {
  sql.query(`SELECT * FROM m_records WHERE user_id = ?`, id, (err, res) => {
    if (err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Record;
