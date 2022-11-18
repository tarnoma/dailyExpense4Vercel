const sql = require("../models/db.model");

const checkAdmin = (req, res, next) => {
  sql.query(
    `SELECT * FROM m_users WHERE id = ? && admin = 1`,
    req.id,
    (err, result) => {
      if (err) {
        console.log("Query error: " + err);
        return res.status(500).send({
          message: err.message || "Error while retriveing users.",
        });
      } else {
        if (result.length) {
          return res.send("Authorized access!");
        } else {
          return res.status(403).send("Unauthorized access!");
        }
      }
    }
  );
};
