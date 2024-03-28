const mysql = require("mysql");
const util = require("util");
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "ecommerce",
//   port: "3306",
// });
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.query = util.promisify(db.query).bind(db);

module.exports = db;
