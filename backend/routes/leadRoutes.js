const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware"); // ✅ TOP ME

// Test route
router.get("/test", (req, res) => {
  res.send("Route working ✅");
});

// GET ALL LEADS
router.get("/", verifyToken, (req, res) => {
  const sql = "SELECT * FROM leads";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

// ADD LEAD
router.post("/add", verifyToken, (req, res) => {
  const { name, phone, email, budget, preference, source, status } = req.body;

  const sql = `
    INSERT INTO leads (name, phone, email, budget, preference, source, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, phone, email, budget, preference, source, status], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send("Lead added successfully ✅");
  });
});

// UPDATE LEAD
router.put("/update/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { name, phone, email, budget, preference, source, status } = req.body;

  const sql = `
    UPDATE leads 
    SET name=?, phone=?, email=?, budget=?, preference=?, source=?, status=? 
    WHERE id=?
  `;

  db.query(sql, [name, phone, email, budget, preference, source, status, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send("Lead updated successfully ✅");
  });
});

// DELETE LEAD
router.delete("/delete/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM leads WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send("Lead deleted successfully 🗑️");
  });
});

module.exports = router;