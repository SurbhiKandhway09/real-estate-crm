const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", // 👈 change this
  database: "real_estate_crm",
});

db.connect((err) => {
  if (err) console.log("DB Error ❌", err);
  else console.log("DB Connected ✅");
});

module.exports = db;