const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 데이터베이스에 연결
connection.connect((err) => {
  if (err) {
    console.error(
      "Error connecting to the database:",
      err.stack
    );
    return;
  }
  console.log(
    "connected to database as id",
    connection.threadId
  );
});

module.exports = app;
