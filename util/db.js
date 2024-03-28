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
  host: "bjed1kqbocbzt3ngllsp-mysql.services.clever-cloud.com",
  user: "ui4a0im1iegnevr7",
  password: "4OqZfRzgCM2DSI1FGUhv",
  database: "bjed1kqbocbzt3ngllsp",
  port: 3306,
});

db.query = util.promisify(db.query).bind(db);

module.exports = db;
