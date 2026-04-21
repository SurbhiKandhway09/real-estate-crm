const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ GET ALL
router.get("/", (req, res) => {
  db.query("SELECT * FROM leads ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

// ✅ ADD
router.post("/", (req, res) => {
  const { name, email, phone, budget, preference, source, status } = req.body;

  const sql = `
    INSERT INTO leads (name, email, phone, budget, preference, source, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, phone, budget, preference, source, status],
    (err) => {
      if (err) {
        console.log("❌ INSERT ERROR:", err);
        return res.status(500).json(err);
      }
      res.json({ message: "Lead added ✅" });
    }
  );
});

// ✅ UPDATE
router.put("/:id", (req, res) => {
  const { name, email, phone, budget, preference, source, status } = req.body;

  const sql = `
    UPDATE leads 
    SET name=?, email=?, phone=?, budget=?, preference=?, source=?, status=? 
    WHERE id=?
  `;

  db.query(
    sql,
    [name, email, phone, budget, preference, source, status, req.params.id],
    (err) => {
      if (err) {
        console.log("❌ UPDATE ERROR:", err);
        return res.status(500).json(err);
      }
      res.json({ message: "Lead updated ✅" });
    }
  );
});

// ✅ DELETE
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM leads WHERE id=?", [req.params.id], (err) => {
    if (err) {
      console.log("❌ DELETE ERROR:", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Lead deleted ✅" });
  });
});

module.exports = router;