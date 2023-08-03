const mysql = require("mysql2");
const dbConfig = require("../configs/db.config");

require("dotenv").config()
const connection = mysql.createConnection(process.env.DATABASE_URL)

// const connection = mysql.createConnection({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB,
//   port: dbConfig.PORT,
// });

connection.connect((error) => {
  if (error) console.log("MYSQL connection: " + error);
  else console.log("Successfully connected to the database.");
});

setInterval(function () {
  connection.ping((err) => {
    if (err) throw err;
  });
}, 15000);

module.exports = connection;
