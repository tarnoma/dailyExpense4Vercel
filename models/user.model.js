const sql = require("./db.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const scKey = require("../configs/jwt.config");

const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.username = user.username;
  this.password = user.password;
  this.img = user.img;
};
const expireTime = "1h";

User.register = (newUser, result) => {
  sql.query("INSERT INTO m_users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    const token = jwt.sign({ id: res.insertId }, scKey.secret, {
      noTimestamp: true,
      expiresIn: expireTime,
    });
    console.log("User registered: ", {
      id: res.insertId,
      ...newUser,
      accessToken: token,
      admin: 0,
    });
    result(null, {
      id: res.insertId,
      ...newUser,
      accessToken: token,
      admin: 0,
    });
  });
};

User.checkUsername = (username, result) => {
  sql.query(
    "SELECT * FROM m_users WHERE username='" + username + "'",
    (err, res) => {
      if (err) {
        console.log("Query error: " + err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Found username: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ msg: "not_found" }, null);
    }
  );
};

User.login = (account, result) => {
  sql.query(
    "SELECT * FROM m_users WHERE username='" + account.username + "'",
    (err, res) => {
      if (err) {
        console.log("Query error: " + err);
        result(err, null);
        return;
      }
      if (res.length) {
        const validPassword = bcrypt.compareSync(
          account.password,
          res[0].password
        );
        if (validPassword) {
          const token = jwt.sign({ id: res[0].id }, scKey.secret, {
            noTimestamp: true,
            expiresIn: expireTime,
          });
          console.log("Login success. Token was generated: " + token);
          res[0].accessToken = token;
          result(null, res[0]);
          return;
        } else {
          console.log("Password invalid.");
          result({ msg: "invalid_pass" }, null);
          return;
        }
      }
      result({ msg: "not_found" }, null);
    }
  );
};

User.toggleActiveById = (id, active, result) => {
  sql.query(
    "UPDATE m_users SET active = ? WHERE id=?",
    [active, id],
    (err, res) => {
      if (err) {
        console.log("Query error: " + err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        //this user id not found
        result({ msg: "not_found" }, null);
        //Mistake return so sent more than one response
        return;
      }
      console.log("Updated user: ", { id: id, ...res });
      result(null, { id: id, ...res });
    }
  );
};

User.getAllUsers = (result) => {
  sql.query(`SELECT * FROM m_users`, (err, res) => {
    if (err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = User;
