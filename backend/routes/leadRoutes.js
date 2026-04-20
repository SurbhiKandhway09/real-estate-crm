const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/auth");

/* ===== GET LEADS (PROTECTED) ===== */
router.get("/", verifyToken, (req, res) => {
  db.query("SELECT * FROM leads", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* ===== ADD LEAD ===== */
router.post("/add", verifyToken, (req, res) => {
  const { name, phone, email, budget, preference, source, status } = req.body;

  db.query(
    "INSERT INTO leads (name, phone, email, budget, preference, source, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, phone, email, budget, preference, source, status],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Lead added ✅" });
    }
  );
});

module.exports = router;