const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ GET all leads
router.get("/", (req, res) => {
  db.query("SELECT * FROM leads", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ✅ ADD lead
router.post("/", (req, res) => {
  const { name, email, phone, source, status } = req.body;

  const sql =
    "INSERT INTO leads (name, email, phone, source, status) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, email, phone, source, status], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Lead added ✅" });
  });
});

// ✅ UPDATE lead
router.put("/:id", (req, res) => {
  const { name, email, phone, source, status } = req.body;

  const sql =
    "UPDATE leads SET name=?, email=?, phone=?, source=?, status=? WHERE id=?";

  db.query(
    sql,
    [name, email, phone, source, status, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Lead updated ✅" });
    }
  );
});

// ✅ DELETE lead
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM leads WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Lead deleted ✅" });
  });
});

module.exports = router;