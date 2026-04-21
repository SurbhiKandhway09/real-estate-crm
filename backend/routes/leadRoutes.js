const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/auth");
const checkRole = require("../middleware/role");

// GET
router.get("/", verifyToken, (req, res) => {
  db.query("SELECT * FROM leads", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ADD (admin)
router.post("/add", verifyToken, checkRole("admin"), (req, res) => {
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

// DELETE (admin)
router.delete("/:id", verifyToken, checkRole("admin"), (req, res) => {
  db.query("DELETE FROM leads WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted ✅" });
  });
});

// UPDATE (admin)
router.put("/:id", verifyToken, checkRole("admin"), (req, res) => {
  const { name, phone, status } = req.body;

  db.query(
    "UPDATE leads SET name=?, phone=?, status=? WHERE id=?",
    [name, phone, status, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated ✅" });
    }
  );
});

module.exports = router;