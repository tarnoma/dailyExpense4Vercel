const sql = require("../models/db.model");

const checkRecordOwner = (req, res, next) => {
  sql.query(
    `SELECT * FROM m_records rec INNER JOIN m_users users ON rec.user_id = users.id WHERE rec.user_id = ${req.id} && rec.id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log("Query error: " + err);
        return res.status(500).send({
          message: err.message || "Error while retriveing records.",
        });
      } else {
        if (result.length) {
          //return res.send("Authorized access!");
          next();
        } else {
          return res.status(403).send("Unauthorized access!");
        }
      }
    }
  );
};

module.exports = checkRecordOwner;
