"use strict";

var mysql = require("mysql");

var db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "admin123",
  database: "my_db_01"
});
module.exports = db;