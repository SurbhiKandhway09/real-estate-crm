const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "roundhouse.proxy.rlwy.net",
  user: "root",
  password: "tFQIyyziddAyUBWXGfnQBBsQszpLyeJs",
  database: "railway",
  port: 41752
});

db.connect((err) => {
  if (err) {
    console.log("DB Error ❌", err);
  } else {
    console.log("Database connected successfully ✅");
  }
});

module.exports = db;