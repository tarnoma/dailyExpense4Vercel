const sql = require("./db.model");

const Record = function (record) {
  this.user_id = record.user_id;
  this.category_id = record.category_id;
  this.spent = record.spent;
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

Record.getRecordsAndCat = (id, result) => {
  sql.query(
    `SELECT rec.id , rec.date , cat.icon , cat.name , cat.src , rec.spent FROM m_records rec INNER JOIN m_category cat ON cat.id = rec.category_id WHERE user_id = ?`,
    id,
    (err, res) => {
      if (err) {
        console.log("Query error: " + err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Record.deleteRecord = (id, result) => {
  sql.query(`DELETE FROM m_records WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ msg: "not_found" }, null);
      return;
    }
    console.log("Deleted record id: ", id);
    result(null, { id: id });
  });
};

module.exports = Record;
